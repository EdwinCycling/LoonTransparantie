import express from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ExactToken } from './types';

// Load environment variables
dotenv.config();

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extend session interface
declare module 'express-session' {
  interface SessionData {
    token?: ExactToken;
    division?: number;
    isAppAuthorized?: boolean;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// --- Authentication Middleware ---
const checkAppAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Als er geen APP_USER is ingesteld, laten we alles door (voor local dev)
  if (!process.env.APP_USER || !process.env.APP_PASSWORD) {
    return next();
  }

  if (req.session.isAppAuthorized) {
    return next();
  }

  res.status(401).json({ error: 'Niet geautoriseerd voor de applicatie' });
};

// Middleware
app.use((req, res, next) => {
  // Skip ngrok browser warning
  res.setHeader('ngrok-skip-browser-warning', 'true');
  console.log(`[DEBUG] ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  proxy: true, // Trust ngrok proxy
  cookie: { 
    secure: true, // Required for sameSite: 'none'
    sameSite: 'none', // Required for cross-site redirects (Exact -> Callback)
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Constants
const EXACT_AUTH_URL = 'https://start.exactonline.nl/api/oauth2/auth';
const EXACT_TOKEN_URL = 'https://start.exactonline.nl/api/oauth2/token';
const EXACT_API_URL = 'https://start.exactonline.nl/api/v1';

// --- Helper Functions ---

/**
 * Checks if the current token is valid or expired.
 * If expired, it attempts to refresh the token using the refresh_token.
 */
async function getValidToken(req: express.Request): Promise<string | null> {
  if (!req.session.token) return null;

  const now = Date.now();
  // Buffer of 60 seconds before actual expiration
  if (req.session.token.expires_at && now < req.session.token.expires_at - 60000) {
    return req.session.token.access_token;
  }

  console.log('Token expired or expiring soon, refreshing...');
  
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', req.session.token.refresh_token);
    params.append('client_id', process.env.CLIENT_ID!);
    params.append('client_secret', process.env.CLIENT_SECRET!);

    const response = await axios.post(EXACT_TOKEN_URL, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const newToken: ExactToken = response.data;
    // Calculate new expiration time
    newToken.expires_at = Date.now() + (newToken.expires_in * 1000);
    
    // Update session
    req.session.token = newToken;
    req.session.save();

    console.log('Token refreshed successfully.');
    return newToken.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

/**
 * Gets the current division (Administration) for the user.
 */
async function getDivision(accessToken: string): Promise<number | null> {
  try {
    const response = await axios.get(`${EXACT_API_URL}/current/Me`, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
    });
    return response.data.d.results[0].CurrentDivision;
  } catch (error) {
    console.error('Error fetching division:', error);
    return null;
  }
}

// --- Routes ---

// 0. App Login Route
app.post('/api/app-login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.APP_USER && password === process.env.APP_PASSWORD) {
    req.session.isAppAuthorized = true;
    req.session.save((err) => {
      if (err) return res.status(500).json({ success: false, error: 'Sessie opslaan mislukt' });
      res.json({ success: true });
    });
  } else {
    res.status(401).json({ success: false, error: 'Ongeldige gebruikersnaam of wachtwoord' });
  }
});

// 0.5 App Logout Route
app.post('/api/app-logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, error: 'Uitloggen mislukt' });
    res.json({ success: true });
  });
});

// 0.6 Exact Online Logout Route (only clear token)
app.post('/api/exact-logout', (req, res) => {
  delete req.session.token;
  delete req.session.division;
  req.session.save((err) => {
    if (err) return res.status(500).json({ success: false, error: 'Exact uitloggen mislukt' });
    res.json({ success: true });
  });
});

// 1. Login Route - Redirects to Exact Online
app.get('/auth/login', (req, res) => {
  const redirectUri = process.env.REDIRECT_URI;
  
  if (!redirectUri) {
    console.error('[ERROR] REDIRECT_URI is niet ingesteld in .env');
    return res.status(500).send('Configuratiefout: REDIRECT_URI ontbreekt');
  }

  const authUrl = `${EXACT_AUTH_URL}?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&force_login=0`;
  
  console.log(`[DEBUG] Redirect URI being sent to Exact: ${redirectUri}`);
  console.log(`[DEBUG] Full Auth URL: ${authUrl}`);
  
  res.redirect(authUrl);
});

// 2. Callback Route - Handles the code from Exact
app.get('/callback', async (req, res) => {
  const code = req.query.code as string;
  const redirectUri = process.env.REDIRECT_URI;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  if (!redirectUri) {
    console.error('[ERROR] REDIRECT_URI is niet ingesteld in .env');
    return res.status(500).send('Configuratiefout: REDIRECT_URI ontbreekt');
  }

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', process.env.CLIENT_ID!);
    params.append('client_secret', process.env.CLIENT_SECRET!);

    const response = await axios.post(EXACT_TOKEN_URL, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const token: ExactToken = response.data;
    token.expires_at = Date.now() + (token.expires_in * 1000);

    console.log('[DEBUG] Token ontvangen van Exact Online. Access token aanwezig:', !!token.access_token);
    req.session.token = token;
    req.session.isAppAuthorized = true; // Zorg dat de app autorisatie behouden blijft
    
    // Sla de sessie expliciet op voordat we redirecten
    req.session.save((err) => {
      if (err) {
        console.error('[DEBUG] Fout bij opslaan sessie in callback:', err);
        return res.status(500).send('Sessie fout');
      }
      console.log('[DEBUG] Sessie succesvol opgeslagen (met token), redirect naar /');
      res.redirect('/'); // Redirect back to the frontend app
    });
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Authentication failed');
  }
});

// 3. Status Check - For Frontend to know if logged in
app.get('/api/status', (req, res) => {
  console.log(`[DEBUG] Status check - isAppAuthorized: ${!!req.session.isAppAuthorized}, isAuthenticated: ${!!req.session.token}, hasDivision: ${!!req.session.division}`);
  res.json({ 
    isAppAuthorized: !!req.session.isAppAuthorized,
    isAuthenticated: !!req.session.token,
    hasDivision: !!req.session.division
  });
});

// 4. Get All Divisions
app.get('/api/divisions', checkAppAuth, async (req, res) => {
  const accessToken = await getValidToken(req);
  if (!accessToken) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // We first need a division code to call system/Divisions or system/AllDivisions
    // We get the current one from Me
    const currentDivision = await getDivision(accessToken);
    if (!currentDivision) {
      throw new Error('Could not determine current division');
    }

    console.log(`[DEBUG] Fetching all divisions using division ${currentDivision} as context...`);
    const response = await axios.get(`${EXACT_API_URL}/${currentDivision}/system/AllDivisions?$select=Code,Description`, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
    });
    
    const divisions = response.data?.d?.results || response.data?.d || [];
    res.json(divisions);
  } catch (error: any) {
    console.error('Error fetching divisions:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    res.status(500).json({ error: 'Failed to fetch divisions' });
  }
});

// 5. Set Active Division
app.post('/api/set-division', checkAppAuth, (req, res) => {
  const { division } = req.body;
  if (!division) return res.status(400).json({ error: 'Division is required' });
  
  req.session.division = parseInt(division);
  req.session.save((err) => {
    if (err) return res.status(500).json({ error: 'Failed to save session' });
    res.json({ success: true, division: req.session.division });
  });
});

// 6. Data Endpoint - Fetches and maps Employees
app.get('/api/employees', checkAppAuth, async (req, res) => {
  const accessToken = await getValidToken(req);
  
  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const division = req.session.division || await getDivision(accessToken);
  if (!division) {
    return res.status(500).json({ error: 'Could not determine division' });
  }

  try {
    console.log(`[DEBUG] Fetching comprehensive payroll data for division ${division}...`);

    // Helper to fetch from Exact with error handling
    const fetchExact = async (endpoint: string, select?: string) => {
      try {
        const url = `${EXACT_API_URL}/${division}/${endpoint}${select ? `?$select=${select}&$top=1000` : '?$top=1000'}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
        });
        return response.data?.d?.results || response.data?.d || [];
      } catch (error: any) {
        console.error(`[DEBUG] Error fetching ${endpoint}:`, error.response?.data?.error?.message || error.message);
        return [];
      }
    };

    // Parallel fetching of all required data
    const [employees, salaries, contracts, jobGroups, jobTitles, orgs] = await Promise.all([
      fetchExact('payroll/Employees', 'ID,Code,BirthDate,Gender,FirstName,LastName,FullName'),
      fetchExact('payroll/EmploymentSalaries', 'Employee,FulltimeAmount,ParttimeAmount,AverageHoursPerWeek,HourlyWage,ParttimeFactor,StartDate,EndDate'),
      fetchExact('payroll/EmploymentContracts', 'Employee,Type,TypeDescription,StartDate,EndDate'),
      fetchExact('hrm/JobGroups', 'ID,Code,Description'),
      fetchExact('hrm/JobTitles', 'ID,Code,Description,JobGroup,JobGroupDescription'),
      fetchExact('payroll/EmploymentOrganizations', 'Employee,JobTitle,JobTitleCode,JobTitleDescription,StartDate,EndDate')
    ]);

    console.log(`[DEBUG] Fetched: ${employees.length} employees, ${salaries.length} salaries, ${contracts.length} contracts, ${jobGroups.length} job groups, ${jobTitles.length} job titles, ${orgs.length} org records.`);

    // Helper to extract date from Exact format
    const parseExactDate = (dateStr: string) => {
      if (!dateStr) return 0;
      if (typeof dateStr === 'string' && dateStr.includes('/Date(')) {
        return parseInt(dateStr.match(/\/Date\((\d+)\)\//)?.[1] || '0');
      }
      return new Date(dateStr).getTime();
    };

    // Helper to find the latest record for an employee
    const findLatest = (list: any[], employeeId: string) => {
      const filtered = list.filter(item => item.Employee === employeeId);
      if (filtered.length === 0) return null;
      if (filtered.length === 1) return filtered[0];

      return filtered.sort((a, b) => {
        // 1. Prioritize records without an EndDate (currently active)
        if (!a.EndDate && b.EndDate) return -1;
        if (a.EndDate && !b.EndDate) return 1;

        // 2. If both are active or both are closed, sort by StartDate (latest first)
        const dateA = parseExactDate(a.StartDate);
        const dateB = parseExactDate(b.StartDate);
        
        if (dateB !== dateA) {
          return dateB - dateA;
        }

        // 3. Fallback to EndDate if StartDate is equal
        return parseExactDate(b.EndDate) - parseExactDate(a.EndDate);
      })[0];
    };

    // C. Map Data
    const mappedData = employees.map((emp: any) => {
      // Find the LATEST active records for this employee
      const empSalary = findLatest(salaries, emp.ID);
      const empContract = findLatest(contracts, emp.ID);
      const empOrg = findLatest(orgs, emp.ID);
      
      // Determine Job Category/Group
      let jobCategory = 'Overig';
      if (empOrg) {
        // Find job title by code first (as requested), then by ID
        const jobTitle = jobTitles.find((jt: any) => 
          (empOrg.JobTitleCode && jt.Code === empOrg.JobTitleCode) || 
          (jt.ID === empOrg.JobTitle)
        );
        
        if (jobTitle && jobTitle.JobGroupDescription) {
          jobCategory = jobTitle.JobGroupDescription;
        } else if (empOrg.JobTitleDescription) {
          jobCategory = empOrg.JobTitleDescription;
        }
      }

      // Calculate Age
      let age = 0;
      if (emp.BirthDate) {
        let birthDate: Date | null = null;
        if (typeof emp.BirthDate === 'string' && emp.BirthDate.includes('/Date(')) {
          const timestamp = parseInt(emp.BirthDate.match(/\/Date\((\d+)\)\//)?.[1] || '0');
          if (timestamp) birthDate = new Date(timestamp);
        } else {
          birthDate = new Date(emp.BirthDate);
        }

        if (birthDate && !isNaN(birthDate.getTime())) {
          const today = new Date();
          age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
        }
      }

      // Calculate Wages
      // Use HourlyWage if available, otherwise calculate from ParttimeAmount or FulltimeAmount
      let hourlyWage = empSalary?.HourlyWage || 0;
      if (hourlyWage === 0) {
        const amount = empSalary?.ParttimeAmount || empSalary?.FulltimeAmount || 0;
        if (amount > 0) {
          // Fallback calculation (assuming monthly)
          hourlyWage = amount / 173.33;
        }
      }

      // Add random variable hourly component for 50% of employees
      // This is for demonstration purposes as requested by the user
      // We use the index or ID to make it somewhat stable but still random-ish
      const hasVariablePay = (employees.indexOf(emp) % 2 === 0); 
      const variableHourlyComponent = hasVariablePay ? parseFloat((2.50 + Math.random() * 5.0).toFixed(2)) : 0;
      const totalHourlyWage = hourlyWage + variableHourlyComponent;

      // FTE and Hours
      const fte = empSalary?.ParttimeFactor || 1.0;
      const annualHours = (empSalary?.AverageHoursPerWeek || 38) * 52;

      // Use FullName or FirstName + LastName
      const fullName = emp.FullName || (emp.FirstName && emp.LastName ? `${emp.FirstName} ${emp.LastName}` : (emp.Code || 'Medewerker'));

      return {
        id: emp.Code || emp.ID,
        fullName: fullName,
        gender: emp.Gender === 'M' ? 'Man' : (emp.Gender === 'V' || emp.Gender === 'F' ? 'Vrouw' : 'Onbekend'),
        age: age || 30,
        jobCategory: jobCategory,
        baseHourlyWage: parseFloat(hourlyWage.toFixed(2)),
        variableHourlyComponent: variableHourlyComponent,
        totalHourlyWage: parseFloat(totalHourlyWage.toFixed(2)),
        fte: parseFloat(fte.toFixed(2)),
        annualHours: Math.round(annualHours),
        grossAnnualWage: parseFloat((totalHourlyWage * annualHours).toFixed(2))
      };
    });

    res.json(mappedData);

  } catch (error: any) {
    console.error('Error processing data from Exact:', error);
    res.status(500).json({ error: 'Failed to process data from Exact Online' });
  }
});

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get(/(.*)/, (req, res) => {
  // Exclude API routes
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// 8. Catch-all voor dashboard/andere routes
app.get('/dashboard', checkAppAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[DEBUG] Server starting...`);
  console.log(`[DEBUG] Environment check:`);
  console.log(`- PORT: ${PORT}`);
  console.log(`- CLIENT_ID configured: ${!!process.env.CLIENT_ID}`);
  console.log(`- CLIENT_SECRET configured: ${!!process.env.CLIENT_SECRET}`);
  console.log(`- REDIRECT_URI: ${process.env.REDIRECT_URI}`);
  console.log(`Server running on http://localhost:${PORT}`);
});
