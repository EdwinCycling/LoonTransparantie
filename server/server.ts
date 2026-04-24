import express from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
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
const forceSecureCookies = process.env.COOKIE_SECURE === 'true';
const sessionCookieSecure: boolean | 'auto' = forceSecureCookies ? true : 'auto';
const sessionCookieSameSite: 'lax' | 'none' = forceSecureCookies ? 'none' : 'lax';

app.set('trust proxy', 1);

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
    secure: sessionCookieSecure,
    sameSite: sessionCookieSameSite,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Constants
const EXACT_AUTH_URL = 'https://start.exactonline.nl/api/oauth2/auth';
const EXACT_TOKEN_URL = 'https://start.exactonline.nl/api/oauth2/token';
const EXACT_API_URL = 'https://start.exactonline.nl/api/v1';

type AgentPeriod = 'nu' | 'vorig_jaar' | 'trend';
type AnswerLength = 'kort' | 'lang';

interface AgentApiCall {
  endpoint: string;
  status: 'success' | 'error' | 'pending' | 'info';
  records: number;
  message?: string;
}

const STRATEGIC_HR_AGENT_INSTRUCTION = `Systeeminstructie: Persona "Strategisch HR-Analist"
1. Rol en Profiel
Je bent een Senior Strategisch HR-Analist & Business Partner. Je combineert diepgaande data-analyse uit Exact Online met uitgebreide kennis van de Nederlandse arbeidsmarkt, wetgeving en HR-trends.
Jouw doel is niet alleen het geven van cijfers, maar het bieden van context en handelingsperspectief. Je spreekt de taal van zowel de HR-manager als de CEO.
2. Expertise en Context (Nederlandse Markt)
Je beschikt over actuele kennis van:
Nederlandse Wetgeving: Wet Verbetering Poortwachter (verzuim), Wet Arbeidsmarkt in Balans (WAB), Wet Flex en Zekerheid (ketenregeling).
HR Metrics: FTE-berekeningen, verloop (LTM), meldingsfrequentie, Bradford Factor en verzuimpercentages.
Marktkennis: Krapte op de arbeidsmarkt, vergrijzing, loonontwikkeling (CAO-trends) en secundaire arbeidsvoorwaarden in Nederland.
3. Gebruik van Technische Bronnen (HAM & YAML)
Je werkt volgens een strikt proces:
HAM (HR Analysis Model): Je gebruikt de XSD-structuur als jouw enige waarheid voor data. Je weet dat LnLbPh Bruto Salaris betekent en FsIndFZ de Flex-fase is.
YAML: Je volgt de formules in de YAML-configuratie voor elke KPI om rekenkundige consistentie te garanderen.
Data-Snapshots: Bij vragen over trends vergelijk je proactief de verschillende peildatums in de aangeleverde HAM-data.
4. Communicatiestijl en Toon
Professioneel & Analytisch: Je bent feitelijk, maar niet droog. Je gebruikt data om je punten te bewijzen.
Adviserend: Je stopt niet bij het getal. Je vraagt jezelf altijd af: "Wat betekent dit voor de klant?"
Proactief: Als je een zorgwekkende trend ziet (bijvoorbeeld een stijgende gemiddelde leeftijd of een piek in kortdurend verzuim), benoem je dit direct.
Taalgebruik: Zakelijk Nederlands. Vermijd technisch jargon over API's of GUID's. Gebruik termen die in een Nederlandse bestuurskamer gebruikelijk zijn.
5. Rapportage Structuur (Verplicht format)
Elk antwoord op een KPI-vraag moet de volgende structuur bevatten:
[KPI Naam] - [Peildatum]
Een korte 'one-liner' die de huidige status samenvat.
1. Executive Summary
Een korte samenvatting van de belangrijkste bevindingen (max 3 zinnen).
2. Kerncijfers & Trend
Een overzichtelijke tabel met de huidige waarde en de vergelijking met voorgaande periodes (T-12, T-24).
3. Analyse & Context
Duiding van de cijfers. Betrek hierbij de Nederlandse marktomstandigheden.
4. Strategisch Advies
Concreet advies op basis van de data. Wat moet de gebruiker morgen doen?
6. Wat je NOOIT doet
Je praat niet over API-fouten, JSON-structuren of XSD-technieken.
Je speculeert niet over data die je niet hebt gekregen.
Je toont geen GUID's of technische ID's; gebruik altijd namen of HID's.
Je mag nooit iets beantwoorden wat niet met jouw scope te maken heeft, dus niks buiten HR & Salaris om.
Verzin nooit iets, heb je de data niet, geef dat aan.
Wordt er een vraag gesteld die je niet kent, geef dat aan.`;

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

function parseExactDate(dateValue: string | null | undefined): number | null {
  if (!dateValue) return null;
  if (typeof dateValue === 'string' && dateValue.includes('/Date(')) {
    const parsed = parseInt(dateValue.match(/\/Date\((\d+)\)\//)?.[1] || '0', 10);
    return Number.isNaN(parsed) || parsed <= 0 ? null : parsed;
  }
  const parsed = new Date(dateValue).getTime();
  return Number.isNaN(parsed) ? null : parsed;
}

function isActiveOnDate(startDateValue: string | null | undefined, endDateValue: string | null | undefined, snapshotDate: Date): boolean {
  const snapshotTimestamp = snapshotDate.getTime();
  const start = parseExactDate(startDateValue);
  if (!start || start > snapshotTimestamp) {
    return false;
  }
  const end = parseExactDate(endDateValue);
  return end === null || end >= snapshotTimestamp;
}

function calculateAgeOnDate(birthDateValue: string | null | undefined, snapshotDate: Date): number | null {
  const birthTimestamp = parseExactDate(birthDateValue);
  if (!birthTimestamp) {
    return null;
  }
  const birthDate = new Date(birthTimestamp);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }
  let age = snapshotDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = snapshotDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && snapshotDate.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age >= 0 ? age : null;
}

function getUpcomingBirthdayDetails(birthDateValue: string | null | undefined, referenceDate: Date): { nextBirthday: string; daysUntil: number; ageTurning: number } | null {
  const birthTimestamp = parseExactDate(birthDateValue);
  if (!birthTimestamp) {
    return null;
  }
  const birthDate = new Date(birthTimestamp);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const refUtc = Date.UTC(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const month = birthDate.getMonth();
  const day = birthDate.getDate();

  let nextYear = referenceDate.getFullYear();
  let nextBirthdayUtc = Date.UTC(nextYear, month, day);
  if (nextBirthdayUtc < refUtc) {
    nextYear += 1;
    nextBirthdayUtc = Date.UTC(nextYear, month, day);
  }

  const daysUntil = Math.floor((nextBirthdayUtc - refUtc) / (24 * 60 * 60 * 1000));
  const nextBirthdayDate = new Date(nextBirthdayUtc);
  const ageTurning = nextBirthdayDate.getUTCFullYear() - birthDate.getFullYear();

  return {
    nextBirthday: nextBirthdayDate.toISOString().slice(0, 10),
    daysUntil,
    ageTurning
  };
}

function getSnapshotDates(period: AgentPeriod, nowDate: Date): Array<{ label: string; date: Date }> {
  const createShiftedDate = (baseDate: Date, yearsBack: number): Date => {
    const shifted = new Date(baseDate);
    shifted.setFullYear(baseDate.getFullYear() - yearsBack);
    return shifted;
  };

  if (period === 'vorig_jaar') {
    return [{ label: 'T-12', date: createShiftedDate(nowDate, 1) }];
  }
  if (period === 'trend') {
    return [
      { label: 'T-0', date: createShiftedDate(nowDate, 0) },
      { label: 'T-12', date: createShiftedDate(nowDate, 1) },
      { label: 'T-24', date: createShiftedDate(nowDate, 2) }
    ];
  }
  return [{ label: 'T-0', date: createShiftedDate(nowDate, 0) }];
}

function sanitizeModelText(text: string): string {
  return text
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi, '[hidden-id]')
    .replace(/"ID"\s*:\s*"[^"]+"/g, '"ID":"[hidden-id]"');
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
    console.error('[ERROR] REDIRECT_URI is niet ingesteld in .env of omgevingsvariabelen');
    return res.status(500).send('Configuratiefout: REDIRECT_URI ontbreekt. Controleer je Render Dashboard Environment Variables.');
  }

  const authUrl = `${EXACT_AUTH_URL}?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&force_login=0`;
  
  console.log(`[DEBUG] Poging tot inloggen bij Exact Online`);
  console.log(`[DEBUG] Gebruikte Redirect URI: ${redirectUri}`);
  console.log(`[DEBUG] Zorg dat deze exact hetzelfde is in het Exact Online App Center!`);
  
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
    hasDivision: !!req.session.division,
    kpiAgentAvailable: true
  });
});

app.get('/api/kpi-agent/health', (req, res) => {
  const hasApiKey = Boolean(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
  const model = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();
  res.json({
    available: true,
    ready: hasApiKey,
    hasApiKey,
    model
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
    return res.json({
      answer: 'Geen data beschikbaar.',
      kpi: 'unavailable',
      period: req.body?.period === 'trend' || req.body?.period === 'vorig_jaar' ? req.body.period : 'nu',
      snapshots: [],
      apiCalls: [{ endpoint: 'Stap: Validatie division', status: 'error', records: 0, message: 'Geen division beschikbaar.' }],
      noData: true
    });
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
      fetchExact('payroll/EmploymentOrganizations', 'Employee,JobTitle,JobTitleCode,JobTitleDescription,Department,DepartmentCode,DepartmentDescription,StartDate,EndDate')
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

      const departmentValue = String(empOrg?.DepartmentDescription || empOrg?.DepartmentCode || empOrg?.Department || '').trim();
      const department = departmentValue.length > 0 ? departmentValue : 'Onbekend';

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
        gender: emp.Gender === 'M' ? 'Man' : (emp.Gender === 'V' || emp.Gender === 'F' ? 'Vrouw' : 'X'),
        age: age || 30,
        jobCategory: jobCategory,
        department: department,
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

app.post('/api/kpi-agent/query', checkAppAuth, async (req, res) => {
  const accessToken = await getValidToken(req);
  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const division = req.session.division || await getDivision(accessToken);
  if (!division) {
    return res.json({
      answer: 'Geen data beschikbaar.',
      kpi: 'unavailable',
      period: req.body?.period === 'trend' || req.body?.period === 'vorig_jaar' ? req.body.period : 'nu',
      snapshots: [],
      apiCalls: [{ endpoint: 'Stap: Validatie division', status: 'error', records: 0, message: 'Geen division beschikbaar.' }],
      noData: true
    });
  }

  const googleApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!googleApiKey) {
    return res.json({
      answer: 'Geen data beschikbaar.',
      kpi: 'unavailable',
      period: req.body?.period === 'trend' || req.body?.period === 'vorig_jaar' ? req.body.period : 'nu',
      snapshots: [],
      apiCalls: [{ endpoint: 'Stap: Configuratie', status: 'error', records: 0, message: 'API key ontbreekt in serverconfiguratie.' }],
      noData: true
    });
  }
  const geminiModel = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();

  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question) {
    return res.status(400).json({ error: 'Error: Er is geen vraag meegegeven.' });
  }
  const answerLength: AnswerLength = req.body?.answerLength === 'kort' ? 'kort' : 'lang';

  const period: AgentPeriod = req.body?.period === 'trend' || req.body?.period === 'vorig_jaar' ? req.body.period : 'nu';
  const nowDate = new Date();
  const snapshots = getSnapshotDates(period, nowDate);
  const apiCalls: AgentApiCall[] = [];
  apiCalls.push({ endpoint: 'Stap: Start validatie', status: 'success', records: 1, message: 'Input is gevalideerd.' });

  const fetchExact = async (endpoint: string, select?: string): Promise<any[]> => {
    const query = select ? `?$select=${select}&$top=1000` : '?$top=1000';
    const url = `${EXACT_API_URL}/${division}/${endpoint}${query}`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
      });
      const results = response.data?.d?.results || response.data?.d || [];
      apiCalls.push({ endpoint, status: 'success', records: Array.isArray(results) ? results.length : 0 });
      return Array.isArray(results) ? results : [];
    } catch (error: any) {
      const message = error?.response?.data?.error?.message?.value || error?.message || 'Unknown error';
      apiCalls.push({ endpoint, status: 'error', records: 0, message });
      return [];
    }
  };

  try {
    apiCalls.push({ endpoint: 'Stap: Exact data ophalen', status: 'info', records: 5, message: 'Vijf datasets worden parallel opgehaald.' });
    const [employees, employments, contracts, salaries, absences] = await Promise.all([
      fetchExact('payroll/Employees', 'ID,Code,FullName,FirstName,LastName,BirthDate,Gender'),
      fetchExact('payroll/Employments', 'ID,Employee,StartDate,EndDate'),
      fetchExact('payroll/EmploymentContracts', 'ID,Employee,Type,TypeDescription,StartDate,EndDate'),
      fetchExact('payroll/EmploymentSalaries', 'ID,Employee,AverageHoursPerWeek,ParttimeFactor,HourlyWage,FulltimeAmount,StartDate,EndDate'),
      fetchExact('hrm/LeaveAbsenceHoursByDay', 'Employee,Type,Hours,Date')
    ]);

    const employeesById = new Map<string, any>();
    for (const employee of employees) {
      const employeeId = String(employee.ID || '');
      if (employeeId) {
        employeesById.set(employeeId, employee);
      }
    }

    const employmentsByEmployee = new Map<string, any[]>();
    for (const employment of employments) {
      const employeeId = String(employment.Employee || '');
      if (!employeeId) {
        continue;
      }
      const list = employmentsByEmployee.get(employeeId) || [];
      list.push(employment);
      employmentsByEmployee.set(employeeId, list);
    }

    const contractsByEmployee = new Map<string, any[]>();
    for (const contract of contracts) {
      const employeeId = String(contract.Employee || '');
      if (!employeeId) {
        continue;
      }
      const list = contractsByEmployee.get(employeeId) || [];
      list.push(contract);
      contractsByEmployee.set(employeeId, list);
    }

    const salariesByEmployee = new Map<string, any[]>();
    for (const salary of salaries) {
      const employeeId = String(salary.Employee || '');
      if (!employeeId) {
        continue;
      }
      const list = salariesByEmployee.get(employeeId) || [];
      list.push(salary);
      salariesByEmployee.set(employeeId, list);
    }

    const absenceByEmployee = new Map<string, number>();
    for (const absence of absences) {
      const employeeId = String(absence.Employee || '');
      if (!employeeId || Number(absence.Type) !== 1) {
        continue;
      }
      const hours = Number(absence.Hours || 0);
      const previous = absenceByEmployee.get(employeeId) || 0;
      absenceByEmployee.set(employeeId, previous + (Number.isFinite(hours) ? hours : 0));
    }

    const snapshotResults = snapshots.map(({ label, date }) => {
      const activeEmployeeIds = new Set<string>();
      for (const [employeeId, employmentList] of employmentsByEmployee.entries()) {
        if (employmentList.some((employment) => isActiveOnDate(employment.StartDate, employment.EndDate, date))) {
          activeEmployeeIds.add(employeeId);
        }
      }

      const ages: number[] = [];
      const contractHours: number[] = [];
      const activeProfiles: Array<{ name: string; age: number | null; birthDateValue: string | null | undefined }> = [];
      const medewerkers: any[] = [];
      let syntheticHid = 1;

      for (const employeeId of activeEmployeeIds) {
        const employee = employeesById.get(employeeId);
        if (!employee) {
          continue;
        }
        const employeeName = employee.FullName || [employee.FirstName, employee.LastName].filter(Boolean).join(' ') || `Medewerker ${syntheticHid}`;
        const age = calculateAgeOnDate(employee.BirthDate, date);
        if (age !== null) {
          ages.push(age);
        }
        activeProfiles.push({ name: employeeName, age, birthDateValue: employee.BirthDate });

        const employeeEmployments = (employmentsByEmployee.get(employeeId) || [])
          .filter((employment) => isActiveOnDate(employment.StartDate, employment.EndDate, date))
          .sort((a, b) => (parseExactDate(b.StartDate) || 0) - (parseExactDate(a.StartDate) || 0));

        const employeeContracts = (contractsByEmployee.get(employeeId) || [])
          .filter((contract) => isActiveOnDate(contract.StartDate, contract.EndDate, date))
          .sort((a, b) => (parseExactDate(b.StartDate) || 0) - (parseExactDate(a.StartDate) || 0));

        const employeeSalaries = (salariesByEmployee.get(employeeId) || [])
          .filter((salary) => isActiveOnDate(salary.StartDate, salary.EndDate, date))
          .sort((a, b) => (parseExactDate(b.StartDate) || 0) - (parseExactDate(a.StartDate) || 0));

        const currentSalary = employeeSalaries[0];
        const averageHours = Number(currentSalary?.AverageHoursPerWeek || 0);
        if (Number.isFinite(averageHours) && averageHours > 0) {
          contractHours.push(averageHours);
        }
        const fteFactor = averageHours > 0 ? Number((averageHours / 40).toFixed(4)) : Number(currentSalary?.ParttimeFactor || 0);
        const fulltimeAmount = Number(currentSalary?.FulltimeAmount || 0);
        const hourlyWage = Number(currentSalary?.HourlyWage || 0);

        const mappedEmployments = employeeEmployments.map((employment: any, index: number) => {
          const contract = employeeContracts[index] || employeeContracts[0];
          const contractTypeValue = Number(contract?.Type);
          const contractType = contractTypeValue === 1 ? 'Bepaald' : contractTypeValue === 2 ? 'Onbepaald' : (contract?.TypeDescription || 'Onbekend');
          return {
            Startdatum: new Date(parseExactDate(employment.StartDate) || date.getTime()).toISOString().slice(0, 10),
            Einddatum: parseExactDate(employment.EndDate) ? new Date(parseExactDate(employment.EndDate) || date.getTime()).toISOString().slice(0, 10) : null,
            ContractType: contractType,
            FsIndFZ: null,
            RedenUitdienst: null,
            IsHerintreder: false,
            Capaciteit: {
              FTEFactor: Number.isFinite(fteFactor) ? fteFactor : 0,
              ContractUrenPerWeek: Number.isFinite(averageHours) ? averageHours : 0,
              BrutoSalarisFulltime: Number.isFinite(fulltimeAmount) ? fulltimeAmount : 0,
              Uurloon: Number.isFinite(hourlyWage) ? hourlyWage : 0
            }
          };
        });

        medewerkers.push({
          Identificatie: {
            HID: syntheticHid,
            VolledigeNaam: employeeName,
            Geboortedatum: parseExactDate(employee.BirthDate) ? new Date(parseExactDate(employee.BirthDate) || date.getTime()).toISOString().slice(0, 10) : date.toISOString().slice(0, 10),
            Geslacht: employee.Gender === 'M' ? 1 : (employee.Gender === 'V' || employee.Gender === 'F' ? 2 : 0)
          },
          Organisatie: {
            Afdeling: 'Onbekend',
            Functie: 'Onbekend',
            Functiegroep: null,
            Kostenplaats: null,
            ManagerHID: null
          },
          Dienstverbanden: {
            Dienstverband: mappedEmployments.length > 0 ? mappedEmployments : [{
              Startdatum: date.toISOString().slice(0, 10),
              Einddatum: null,
              ContractType: 'Onbekend',
              FsIndFZ: null,
              RedenUitdienst: null,
              IsHerintreder: false,
              Capaciteit: {
                FTEFactor: 0,
                ContractUrenPerWeek: 0,
                BrutoSalarisFulltime: 0,
                Uurloon: 0
              }
            }]
          },
          Operationeel: {
            VerloondeUren: 0,
            ZiekteUren: Number((absenceByEmployee.get(employeeId) || 0).toFixed(2)),
            ZiektePercentage: 0,
            VerlofUren: 0
          }
        });
        syntheticHid += 1;
      }

      const averageAge = ages.length > 0 ? Number((ages.reduce((acc, value) => acc + value, 0) / ages.length).toFixed(2)) : null;
      const averageContractHours = contractHours.length > 0 ? Number((contractHours.reduce((acc, value) => acc + value, 0) / contractHours.length).toFixed(2)) : null;
      const youngestEmployees = activeProfiles
        .filter((profile) => profile.age !== null)
        .sort((a, b) => (a.age as number) - (b.age as number))
        .slice(0, 10)
        .map((profile) => ({ name: profile.name, age: profile.age }));
      const oldestEmployees = activeProfiles
        .filter((profile) => profile.age !== null)
        .sort((a, b) => (b.age as number) - (a.age as number))
        .slice(0, 10)
        .map((profile) => ({ name: profile.name, age: profile.age }));
      const upcomingBirthdays = activeProfiles
        .map((profile) => {
          const details = getUpcomingBirthdayDetails(profile.birthDateValue, date);
          if (!details || details.daysUntil < 0 || details.daysUntil > 28) {
            return null;
          }
          return {
            name: profile.name,
            currentAge: profile.age,
            ageTurning: details.ageTurning,
            nextBirthday: details.nextBirthday,
            daysUntil: details.daysUntil
          };
        })
        .filter((item) => item !== null)
        .sort((a: any, b: any) => a.daysUntil - b.daysUntil)
        .slice(0, 30);
      const hamModel = {
        Header: {
          AdministratieNaam: `Division ${division}`,
          Peildatum: date.toISOString().slice(0, 10),
          Versie: '2.0-HR-FOCUS'
        },
        Medewerkers: {
          Medewerker: medewerkers
        }
      };

      return {
        label,
        date: date.toISOString().slice(0, 10),
        activeEmployees: activeEmployeeIds.size,
        averageAge,
        averageContractHours,
        youngestEmployees,
        oldestEmployees,
        upcomingBirthdays,
        hamModel
      };
    });

    apiCalls.push({ endpoint: 'Stap: Snapshot berekening', status: 'success', records: snapshotResults.length, message: 'Snapshots voor peildatums zijn berekend.' });
    const yamlPath = path.join(__dirname, '../public/yaml.json');
    const hamPath = path.join(__dirname, '../public/HAM.xml');
    const techSpecsPath = path.join(__dirname, '../public/Tech specs.md');
    const [yamlContent, hamContent, techSpecsContent] = await Promise.all([
      readFile(yamlPath, 'utf-8'),
      readFile(hamPath, 'utf-8'),
      readFile(techSpecsPath, 'utf-8')
    ]);
    apiCalls.push({ endpoint: 'Stap: Instructiebronnen laden', status: 'success', records: 3, message: 'YAML, HAM en Tech Specs geladen.' });

    const trendComparisonAvailable = snapshotResults.length > 1;
    const baseSnapshot = snapshotResults.find((snapshot) => snapshot.label === 'T-0') || snapshotResults[0];
    const answerStyleInstruction = answerLength === 'kort'
      ? 'Geef een compact en zakelijk antwoord. Maximaal 4 korte alinea’s totaal, zonder uitweidingen. Houd elke sectie op 1 zin, behalve de tabel.'
      : 'Geef een uitgebreid antwoord met duidelijke context en onderbouwing binnen het verplichte format. Minimaal 4 secties (1 t/m 4) en altijd minimaal 1 tabel.';

    const detectKpi = (text: string): string => {
      const normalized = text.toLowerCase();
      if (normalized.includes('jongste')) return 'youngest_active_employees';
      if (normalized.includes('oudste')) return 'oldest_active_employees';
      if (normalized.includes('verjaardag') || normalized.includes('jarig')) return 'upcoming_birthdays_4_weeks';
      if (normalized.includes('contracturen') || normalized.includes('uren per week') || normalized.includes('contract uren')) {
        return 'average_contract_hours_active_employees';
      }
      if (normalized.includes('leeftijd')) return 'average_age_active_employees';
      return 'unknown';
    };

    const selectedKpi = detectKpi(question);
    const kpiLabelMap: Record<string, string> = {
      average_age_active_employees: 'Gemiddelde Leeftijd Actieve Medewerkers',
      average_contract_hours_active_employees: 'Gemiddelde Contracturen Actieve Medewerkers',
      youngest_active_employees: 'Jongste Actieve Medewerkers',
      oldest_active_employees: 'Oudste Actieve Medewerkers',
      upcoming_birthdays_4_weeks: 'Komende Verjaardagen (4 weken)',
      unknown: 'HR KPI Rapport'
    };

    const snapshotSummary = snapshotResults.map((snapshot) => ({
      label: snapshot.label,
      date: snapshot.date,
      activeEmployees: snapshot.activeEmployees,
      averageAge: snapshot.averageAge,
      averageContractHours: snapshot.averageContractHours
    }));

    const t0 = snapshotResults.find((s) => s.label === 'T-0');
    const t12 = snapshotResults.find((s) => s.label === 'T-12');
    const t24 = snapshotResults.find((s) => s.label === 'T-24');
    const safeDelta = (current: number | null | undefined, previous: number | null | undefined): number | null => {
      if (typeof current !== 'number' || typeof previous !== 'number') return null;
      return Number((current - previous).toFixed(2));
    };
    const derivedDeltas = {
      averageAgeDeltaVsT12: safeDelta(t0?.averageAge, t12?.averageAge),
      averageAgeDeltaVsT24: safeDelta(t0?.averageAge, t24?.averageAge),
      averageContractHoursDeltaVsT12: safeDelta(t0?.averageContractHours, t12?.averageContractHours),
      averageContractHoursDeltaVsT24: safeDelta(t0?.averageContractHours, t24?.averageContractHours)
    };

    const outputFormatInstruction = (() => {
      if (selectedKpi === 'average_contract_hours_active_employees') {
        return `
OUTPUT FORMAT (VERPLICHT)
- Gebruik geen markdown-koppen met # of ###.
- Gebruik exact deze sectiekoppen en volgorde: 1. Executive Summary, 2. Kerncijfers & Trend, 3. Analyse & Context, 4. Strategisch Advies.
- Start altijd met: "${kpiLabelMap[selectedKpi]} - ${baseSnapshot?.date || 'onbekende peildatum'}" op de eerste regel.
- Daarna 1 korte one-liner (1 zin) met de huidige stand.
- Sectie 2 bevat altijd een markdown-tabel met contracturen:
| Peildatum | Actieve medewerkers (n) | Gem. contracturen per week | Δ vs T-12 | Δ vs T-24 |
| --- | ---: | ---: | ---: | ---: |
- Als trendvergelijking niet beschikbaar is, zet Δ kolommen op "n.v.t.".
- Gebruik waarden uit SNAPSHOT OVERZICHT / DELTAS en verzin niets.
- ${answerStyleInstruction}
`;
      }
      if (selectedKpi === 'average_age_active_employees') {
        return `
OUTPUT FORMAT (VERPLICHT)
- Gebruik geen markdown-koppen met # of ###.
- Gebruik exact deze sectiekoppen en volgorde: 1. Executive Summary, 2. Kerncijfers & Trend, 3. Analyse & Context, 4. Strategisch Advies.
- Start altijd met: "${kpiLabelMap[selectedKpi]} - ${baseSnapshot?.date || 'onbekende peildatum'}" op de eerste regel.
- Daarna 1 korte one-liner (1 zin) met de huidige stand.
- Sectie 2 bevat altijd een markdown-tabel met gemiddelde leeftijd:
| Peildatum | Actieve medewerkers (n) | Gem. leeftijd (jaar) | Δ vs T-12 | Δ vs T-24 |
| --- | ---: | ---: | ---: | ---: |
- Als trendvergelijking niet beschikbaar is, zet Δ kolommen op "n.v.t.".
- Gebruik waarden uit SNAPSHOT OVERZICHT / DELTAS en verzin niets.
- ${answerStyleInstruction}
`;
      }
      return `
OUTPUT FORMAT (VERPLICHT)
- Gebruik geen markdown-koppen met # of ###.
- Gebruik exact deze sectiekoppen en volgorde: 1. Executive Summary, 2. Kerncijfers & Trend, 3. Analyse & Context, 4. Strategisch Advies.
- Start altijd met: "${kpiLabelMap[selectedKpi]} - ${baseSnapshot?.date || 'onbekende peildatum'}" op de eerste regel.
- Sectie 2 bevat altijd minimaal 1 markdown-tabel passend bij de vraag.
- ${answerStyleInstruction}
`;
    })();

    const modelPrompt = `
ROL
Je bent de "Exact Online HR & Payroll Intelligence Agent". Je bent een senior HR-analist die gespecialiseerd is in het vertalen van ruwe personeelsdata naar strategische inzichten.

KENNISBRONNEN
1. Gebruik HAM.xml (XSD) om de hiërarchie van medewerkers, dienstverbanden en verzuim te begrijpen.
2. Gebruik YAML.json om te bepalen welke formules en API-bronnen nodig zijn.
3. Volg de logica in Tech specs.md voor Exact-transformatie.

WERKWIJZE
- Identificeer de KPI op basis van de vraag.
- Gebruik de meegeleverde HAM snapshots.
- Voer geen complexe fiscale berekeningen uit.
- Voor trends analyseer je peildatum snapshots.
- Ondersteun ook detailvragen:
  - "jongste X medewerkers" -> retourneer de jongste medewerkers met naam en leeftijd.
  - "oudste X medewerkers" -> retourneer de oudste medewerkers met naam en leeftijd.
  - "komende verjaardagen" -> toon komende 4 weken gesorteerd op dichtstbijzijnde datum.
- Als X ontbreekt: gebruik standaard X=5.

RAPPORTAGE RICHTLIJNEN
- Wees kritisch op risico's.
- Gebruik begrijpelijke termen: "Loon voor loonbelasting" -> "Bruto Salaris", "FsIndFZ" -> "Flex-fase".
- Maak tabellen als strakke markdown-tabellen met precies dezelfde kolommen per rij.
- Trendvergelijking beschikbaar: ${trendComparisonAvailable ? 'JA' : 'NEE'}.
- Als trendvergelijking NEE is: zet Δ-kolommen op "n.v.t." en houd de tekst beperkt tot de beschikbare peildatum.

BEPERKINGEN
- Toon geen technische GUID's of rauwe API-fouten.
- Als data ontbreekt: benoem dit en adviseer welke velden in Exact Online ontbreken.

MAPPINGREGELS
- Actief op peildatum X: StartDate <= X EN (EndDate >= X OF EndDate IS NULL).
- Capaciteit.FTEFactor: Schedules.AverageHours / 40.
- Dienstverband.ContractType: EmploymentContracts.Type (1=Bepaald, 2=Onbepaald).
- Operationeel.ZiekteUren: som LeaveAbsenceHoursByDay met Type=1.

SYSTEEMINSTRUCTIE_PERSONA
${STRATEGIC_HR_AGENT_INSTRUCTION}

GEBRUIKERSVRAAG
${question}

GESELECTEERDE PERIODE
${period}

GESELECTEERDE KPI (heuristiek)
${selectedKpi}

SNAPSHOT OVERZICHT
${JSON.stringify(snapshotSummary)}

DELTAS (alleen als beschikbaar)
${JSON.stringify(derivedDeltas)}

AANVULLENDE_DEMOGRAFIE_T0
${JSON.stringify({
  date: baseSnapshot?.date,
  youngestEmployees: baseSnapshot?.youngestEmployees || [],
  oldestEmployees: baseSnapshot?.oldestEmployees || [],
  upcomingBirthdays4Weeks: baseSnapshot?.upcomingBirthdays || []
})}

YAML
${yamlContent}

HAM_XSD
${hamContent}

TECH_SPECS
${techSpecsContent}

HAM_SNAPSHOTS_JSON
${JSON.stringify(snapshotResults.map((snapshot) => ({
  label: snapshot.label,
  model: snapshot.hamModel
})))}

${outputFormatInstruction}
`;

    apiCalls.push({ endpoint: 'Stap: AI-analyse', status: 'info', records: 1, message: `Gemini model ${geminiModel} verwerkt de prompt.` });
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${googleApiKey}`,
      {
        contents: [{ role: 'user', parts: [{ text: sanitizeModelText(modelPrompt) }] }],
        generationConfig: {
          temperature: answerLength === 'kort' ? 0.1 : 0.2,
          maxOutputTokens: answerLength === 'kort' ? 360 : 2500
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const answer = geminiResponse.data?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join('\n').trim();
    if (!answer) {
      return res.json({
        answer: 'Geen data beschikbaar.',
        kpi: 'unavailable',
        period,
        snapshots: snapshotResults.map((snapshot) => ({
          label: snapshot.label,
          date: snapshot.date,
          activeEmployees: snapshot.activeEmployees
        })),
        apiCalls: [...apiCalls, { endpoint: 'Stap: AI-resultaat', status: 'error', records: 0, message: 'AI gaf geen bruikbaar antwoord terug.' }],
        noData: true
      });
    }
    apiCalls.push({ endpoint: 'Stap: Rapport gereed', status: 'success', records: 1, message: 'Rapport succesvol samengesteld.' });

    return res.json({
      answer,
      kpi: 'average_age_active_employees,average_contract_hours_active_employees',
      period,
      snapshots: snapshotResults.map((snapshot) => ({
        label: snapshot.label,
        date: snapshot.date,
        activeEmployees: snapshot.activeEmployees,
        averageAge: snapshot.averageAge,
        averageContractHours: snapshot.averageContractHours,
        youngestEmployees: snapshot.youngestEmployees,
        oldestEmployees: snapshot.oldestEmployees,
        upcomingBirthdays: snapshot.upcomingBirthdays
      })),
      apiCalls
    });
  } catch (error: any) {
    console.error('KPI agent query failed:', error?.response?.data || error?.message || error);
    return res.json({
      answer: 'Geen data beschikbaar.',
      kpi: 'unavailable',
      period,
      snapshots: [],
      apiCalls: [...apiCalls, { endpoint: 'Stap: KPI-agent fout', status: 'error', records: 0, message: error?.message || 'Onbekende fout.' }],
      noData: true
    });
  }
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.path.startsWith('/api')) {
    return next(err);
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Error: Ongeldige JSON payload.' });
  }

  const message = typeof err?.message === 'string' && err.message.trim().length > 0
    ? err.message
    : 'Interne serverfout.';
  return res.status(500).json({ error: `Error: ${message}` });
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
