import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Printer, RefreshCw, PieChart, Download, Table as TableIcon, X, LogOut, FileText, User, BarChart2, Search, Bot, Activity, MessageSquare, SendHorizontal, ShieldCheck } from 'lucide-react';
import { analyzeData, calculateMean, calculateGap } from '../services/calculationService';
import { AnalysisReport, Employee, Gender } from '../types';
import MetricCard from '../components/MetricCard';
import { QuartileChart, CategoryGapChart, GenderPieChart } from '../components/Charts';
import IntroPage from '../components/IntroPage';
import DivisionSelector from '../components/DivisionSelector';
import EmployeeReport from '../components/EmployeeReport';
import KpiBuilderWizard from '../components/KpiBuilderWizard';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface DashboardProps {
  onAppLogout?: () => void;
}

type ViewMode = 'dashboard' | 'explanation' | 'employee_check';
type FunctionalityMode = 'loontransparantie' | 'kpi_agent';
type AgentPeriod = 'nu' | 'vorig_jaar' | 'trend';
type AnswerLength = 'kort' | 'lang';
type AgentQueryMode = 'static' | 'dynamic';

interface AgentApiCall {
  endpoint: string;
  status: 'success' | 'error' | 'pending' | 'info';
  records: number;
  message?: string;
}

interface AgentMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AgentCommand {
  id: string;
  title: string;
  explanation: string;
  question: string;
  period: AgentPeriod;
}

type AgentIndicatorColor = 'green' | 'yellow' | 'red' | 'gray';

const STRATEGIC_HR_AGENT_INSTRUCTION = `Systeeminstructie: Persona "Strategisch HR-Analist"
1. Rol en Profiel
Je bent een Senior Strategisch HR-Analist & Business Partner. Je combineert diepgaande data-analyse uit Exact Online met uitgebreide kennis van de Nederlandse arbeidsmarkt, wetgeving en HR-trends.
Jouw doel is niet alleen het geven van cijfers, maar het bieden van context en handelingsperspectief. Je spreekt de taal van zowel de HR-manager als de CEO.
2. Expertise en Context (Nederlandse Markt)
Je beschikt over actuele kennis van:
Nederlandse Wetgeving: Wet Verbetering Poortwachter (verzuim), Wet Arbeidsmarkt in Balans (WAB), Wet Flex en Zekerheid (ketenregeling).
HR Metrics: AJE-berekeningen, verloop (LTM), meldingsfrequentie, Bradford Factor en verzuimpercentages.
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
Je mag nooi iets beantwoorden wat niet met jouw scope te maken heeft, dus niks buiten HR & Salaris om.
Verzin nooit iets, heb je de data niet, geef dat aan.
Wordt er een vraag gesteld die je niet kent, geef dat aan.`;

const Dashboard: React.FC<DashboardProps> = ({ onAppLogout }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDataset, setShowDataset] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // App Auth
  const [isExactAuthenticated, setIsExactAuthenticated] = useState<boolean>(false); // Exact OAuth
  const [hasDivision, setHasDivision] = useState<boolean>(false);
  const [selectedFunctionality, setSelectedFunctionality] = useState<FunctionalityMode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const agentLayoutRef = useRef<HTMLDivElement>(null);
  const middlePanelRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(33.33);
  const [rightPanelWidth, setRightPanelWidth] = useState(33.33);
  const [activeDivider, setActiveDivider] = useState<'left' | 'right' | 'middle' | null>(null);
  const [middleTopHeight, setMiddleTopHeight] = useState(58);
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([
    {
      id: 'intro',
      role: 'assistant',
      content: 'Ik ben klaar om KPI-vragen te analyseren. Kies in het middenpaneel een periode of stel direct je vraag.'
    }
  ]);
  const [agentQuestion, setAgentQuestion] = useState('');
  const [agentPeriod, setAgentPeriod] = useState<AgentPeriod>('nu');
  const [answerLength, setAnswerLength] = useState<AnswerLength>('lang');
  const [agentQueryMode, setAgentQueryMode] = useState<AgentQueryMode>('static');
  const [agentApiCalls, setAgentApiCalls] = useState<AgentApiCall[]>([]);
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [latestAssistantMessageId, setLatestAssistantMessageId] = useState<string | null>(null);
  const [showLatestAssistantHighlight, setShowLatestAssistantHighlight] = useState(false);
  const [showInstructionPanel, setShowInstructionPanel] = useState(false);
  const [yamlContent, setYamlContent] = useState('');
  const [yamlLoading, setYamlLoading] = useState(false);
  const [yamlError, setYamlError] = useState<string | null>(null);
  const [techSpecsContent, setTechSpecsContent] = useState('');
  const [techSpecsLoading, setTechSpecsLoading] = useState(false);
  const [techSpecsError, setTechSpecsError] = useState<string | null>(null);
  const [showTechSpecsModal, setShowTechSpecsModal] = useState(false);
  const [hamContent, setHamContent] = useState('');
  const [hamLoading, setHamLoading] = useState(false);
  const [hamError, setHamError] = useState<string | null>(null);
  const [showHamModal, setShowHamModal] = useState(false);
  const [kpiAgentEndpointAvailable, setKpiAgentEndpointAvailable] = useState(false);
  const [backendIndicatorColor, setBackendIndicatorColor] = useState<AgentIndicatorColor>('gray');
  const [backendIndicatorText, setBackendIndicatorText] = useState('Backend controleren...');
  const [apiIndicatorColor, setApiIndicatorColor] = useState<AgentIndicatorColor>('gray');
  const [apiIndicatorText, setApiIndicatorText] = useState('API readiness controleren...');
  const [showApiMonitorPanel, setShowApiMonitorPanel] = useState(true);
  const [showKpiParametersPanel, setShowKpiParametersPanel] = useState(true);
  const [showYamlPanel, setShowYamlPanel] = useState(true);
  const [showKpiBuilderWizard, setShowKpiBuilderWizard] = useState(false);
  const [showKpiAgentPinModal, setShowKpiAgentPinModal] = useState(false);
  const [kpiAgentPin, setKpiAgentPin] = useState('');
  const [kpiAgentPinLoading, setKpiAgentPinLoading] = useState(false);
  const [kpiAgentPinError, setKpiAgentPinError] = useState<string | null>(null);
  const [kpiAgentPinConfigured, setKpiAgentPinConfigured] = useState<boolean | null>(null);
  const [kpiAgentAttemptsRemaining, setKpiAgentAttemptsRemaining] = useState<number | null>(null);
  const [kpiAgentLockedUntil, setKpiAgentLockedUntil] = useState<number | null>(null);
  
  // New State for View Mode
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  // New State for Employee Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [searchedEmployee, setSearchedEmployee] = useState<Employee | null>(null);
  const [employeeAnalysis, setEmployeeAnalysis] = useState<{
    companyGap: number;
    levelGap: number;
    companyAvg: number;
    levelAvg: number;
  } | null>(null);

  const getGenderBadgeClasses = (gender: Gender) => {
    if (gender === Gender.Male) return 'bg-blue-100 text-blue-800';
    if (gender === Gender.Female) return 'bg-pink-100 text-pink-800';
    return 'bg-slate-100 text-slate-800';
  };

  const getGenderTheme = (gender: Gender) => {
    if (gender === Gender.Female) {
      return {
        container: 'border-pink-200 bg-pink-50',
        heading: 'text-pink-800',
        pill: 'bg-pink-200 text-pink-800'
      };
    }
    if (gender === Gender.Male) {
      return {
        container: 'border-blue-200 bg-blue-50',
        heading: 'text-blue-800',
        pill: 'bg-blue-200 text-blue-800'
      };
    }
    return {
      container: 'border-slate-200 bg-slate-50',
      heading: 'text-slate-800',
      pill: 'bg-slate-200 text-slate-800'
    };
  };

  // Authentication check and initial data fetch
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/status', {
          credentials: 'include',
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const data = await response.json();
        
        setIsAuthenticated(data.isAppAuthorized);
        setIsExactAuthenticated(data.isAuthenticated); // renamed to avoid confusion
        setHasDivision(data.hasDivision);
        setKpiAgentEndpointAvailable(data.kpiAgentAvailable === true);
        
        if (data.isAppAuthorized && data.isAuthenticated && data.hasDivision) {
          fetchData();
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/employees', {
        credentials: 'include',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      if (!response.ok) {
        if (response.status === 401) {
          setIsExactAuthenticated(false);
          return;
        }
        throw new Error('Kon geen gegevens ophalen van de server');
      }
      
      const data: Employee[] = await response.json();
      setEmployees(data);
      
      if (data.length > 0) {
        const analysis = analyzeData(data);
        setReport(analysis);
      }
    } catch (err: any) {
      setError(err.message || 'Er is een onbekende fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!activeDivider) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (activeDivider === 'middle') {
        if (!middlePanelRef.current) return;
        const rect = middlePanelRef.current.getBoundingClientRect();
        const relativeY = event.clientY - rect.top;
        const nextPercent = (relativeY / rect.height) * 100;
        const clampedPercent = Math.max(25, Math.min(nextPercent, 75));
        setMiddleTopHeight(clampedPercent);
        return;
      }

      if (!agentLayoutRef.current) return;
      const rect = agentLayoutRef.current.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const nextPercentFromLeft = (relativeX / rect.width) * 100;
      const minPanelWidth = 15;
      const minMiddleWidth = 20;

      if (activeDivider === 'left') {
        const maxLeft = 100 - rightPanelWidth - minMiddleWidth;
        const clampedLeft = Math.max(minPanelWidth, Math.min(nextPercentFromLeft, maxLeft));
        setLeftPanelWidth(clampedLeft);
        return;
      }

      const nextPercentFromRight = 100 - nextPercentFromLeft;
      const maxRight = 100 - leftPanelWidth - minMiddleWidth;
      const clampedRight = Math.max(minPanelWidth, Math.min(nextPercentFromRight, maxRight));
      setRightPanelWidth(clampedRight);
    };

    const handleMouseUp = () => {
      setActiveDivider(null);
    };

    document.body.style.userSelect = 'none';
    document.body.style.cursor = activeDivider === 'middle' ? 'row-resize' : 'col-resize';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDivider, leftPanelWidth, rightPanelWidth]);

  useEffect(() => {
    const loadYamlContent = async () => {
      setYamlLoading(true);
      setYamlError(null);
      try {
        const response = await fetch('/yaml.json', {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!response.ok) {
          throw new Error('yaml.json kon niet geladen worden.');
        }
        const text = await response.text();
        setYamlContent(text);
      } catch (err: any) {
        setYamlError(err.message || 'Onbekende fout tijdens laden van yaml.json');
      } finally {
        setYamlLoading(false);
      }
    };
    loadYamlContent();
  }, []);

  useEffect(() => {
    if (selectedFunctionality !== 'kpi_agent') {
      return;
    }

    let isCancelled = false;

    const checkReadiness = async () => {
      try {
        const statusResponse = await fetch('/api/status', {
          credentials: 'include',
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!statusResponse.ok) {
          throw new Error('Backend status niet bereikbaar');
        }
        const statusData = await statusResponse.json();
        if (isCancelled) return;

        setKpiAgentEndpointAvailable(statusData.kpiAgentAvailable === true);
        setBackendIndicatorColor('green');
        setBackendIndicatorText('Backend online');

        try {
          const healthResponse = await fetch('/api/kpi-agent/health', {
            credentials: 'include',
            headers: { 'ngrok-skip-browser-warning': 'true' }
          });
          if (!healthResponse.ok) {
            throw new Error('KPI health endpoint niet bereikbaar');
          }
          const healthData = await healthResponse.json();
          if (isCancelled) return;
          if (healthData.ready === true) {
            setApiIndicatorColor('green');
            setApiIndicatorText(`API gereed (${healthData.model || 'model onbekend'})`);
          } else {
            setApiIndicatorColor('yellow');
            setApiIndicatorText('API gedeeltelijk gereed: controleer API-key');
          }
        } catch {
          if (isCancelled) return;
          setApiIndicatorColor('red');
          setApiIndicatorText('API readiness niet bereikbaar');
        }
      } catch {
        if (isCancelled) return;
        setBackendIndicatorColor('red');
        setBackendIndicatorText('Backend offline');
        setApiIndicatorColor('red');
        setApiIndicatorText('API readiness onbekend');
      }
    };

    checkReadiness();
    const intervalId = window.setInterval(checkReadiness, 10000);

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [selectedFunctionality]);

  useEffect(() => {
    if (!showTechSpecsModal && !showHamModal) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showTechSpecsModal, showHamModal]);

  useEffect(() => {
    if (!showLatestAssistantHighlight || selectedFunctionality !== 'kpi_agent') {
      return;
    }

    const clearHighlight = () => {
      setShowLatestAssistantHighlight(false);
    };

    window.addEventListener('pointerdown', clearHighlight, { passive: true });
    window.addEventListener('keydown', clearHighlight);
    window.addEventListener('wheel', clearHighlight, { passive: true });
    window.addEventListener('touchstart', clearHighlight, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', clearHighlight);
      window.removeEventListener('keydown', clearHighlight);
      window.removeEventListener('wheel', clearHighlight);
      window.removeEventListener('touchstart', clearHighlight);
    };
  }, [showLatestAssistantHighlight, selectedFunctionality]);

  const handleDivisionSelected = () => {
    setHasDivision(true);
    setSelectedFunctionality(null);
  };

  const handleFunctionalitySelected = (mode: FunctionalityMode) => {
    if (mode === 'kpi_agent') {
      setKpiAgentPin('');
      setKpiAgentPinError(null);
      setShowKpiAgentPinModal(true);
      loadKpiAgentPinStatus();
      return;
    }

    setSelectedFunctionality(mode);
    if (mode === 'loontransparantie') {
      fetchData();
    }
  };

  const loadKpiAgentPinStatus = async () => {
    try {
      const response = await fetch('/api/kpi-agent/status', {
        credentials: 'include',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      setKpiAgentPinConfigured(data.pinConfigured === true);
      setKpiAgentAttemptsRemaining(typeof data.remainingAttempts === 'number' ? data.remainingAttempts : null);
      setKpiAgentLockedUntil(typeof data.lockedUntil === 'number' ? data.lockedUntil : null);
    } catch {
      setKpiAgentPinConfigured(false);
      setKpiAgentAttemptsRemaining(null);
      setKpiAgentLockedUntil(null);
    }
  };

  const unlockKpiAgent = async (event: React.FormEvent) => {
    event.preventDefault();
    if (kpiAgentPinLoading) {
      return;
    }

    setKpiAgentPinLoading(true);
    setKpiAgentPinError(null);

    try {
      const response = await fetch('/api/kpi-agent/unlock', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ pin: kpiAgentPin })
      });

      const text = await response.text();
      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Error: ${text.slice(0, 180)}`);
        }
      }

      if (!response.ok || data.success !== true) {
        setKpiAgentAttemptsRemaining(typeof data.remainingAttempts === 'number' ? data.remainingAttempts : kpiAgentAttemptsRemaining);
        setKpiAgentLockedUntil(typeof data.lockedUntil === 'number' ? data.lockedUntil : null);
        throw new Error(data?.error || 'Error: Pincode verificatie mislukt.');
      }

      setShowKpiAgentPinModal(false);
      setSelectedFunctionality('kpi_agent');
    } catch (err: any) {
      setKpiAgentPinError(err.message || 'Error: Pincode verificatie mislukt.');
      await loadKpiAgentPinStatus();
    } finally {
      setKpiAgentPinLoading(false);
    }
  };

  const handleExactLogout = async () => {
    try {
      await fetch('/api/exact-logout', { 
        method: 'POST',
        credentials: 'include',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      setIsExactAuthenticated(false);
      setHasDivision(false);
      setSelectedFunctionality(null);
      setEmployees([]);
      setReport(null);
    } catch (err) {
      console.error('Exact logout failed:', err);
    }
  };

  const handleExactLogin = () => {
    window.location.href = '/auth/login';
  };

  const handlePrint = () => {
    const root = document.getElementById('pdf-root');
    if (!root) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      alert('Error: Popup blocked. Sta popups toe om te kunnen printen.');
      return;
    }

    const title = 'Rapportage Loontransparantie';
    const html = `
<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      html, body { margin: 0; padding: 0; background: #fff; color: #111; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
      img, svg { max-width: 100%; }
      @page { margin: 12mm; }
      .no-print { display: none !important; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    </style>
  </head>
  <body>
    ${root.outerHTML}
  </body>
</html>
`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.focus();
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const view = clonedDoc.defaultView;
          if (!view) return;

          const root = clonedDoc.getElementById('pdf-root');
          if (!root) return;

          const scratch = clonedDoc.createElement('span');
          scratch.style.display = 'none';
          clonedDoc.body.appendChild(scratch);

          const needsSanitize = (value: string): boolean => {
            return value.includes('oklch') || value.includes('color-mix');
          };

          const toRgb = (value: string): string | null => {
            try {
              scratch.style.color = '';
              scratch.style.color = value;
              return view.getComputedStyle(scratch).color;
            } catch {
              return null;
            }
          };

          const colorProps: Array<{ js: keyof CSSStyleDeclaration; css: string }> = [
            { js: 'color', css: 'color' },
            { js: 'backgroundColor', css: 'background-color' },
            { js: 'borderColor', css: 'border-color' },
            { js: 'borderTopColor', css: 'border-top-color' },
            { js: 'borderRightColor', css: 'border-right-color' },
            { js: 'borderBottomColor', css: 'border-bottom-color' },
            { js: 'borderLeftColor', css: 'border-left-color' },
            { js: 'outlineColor', css: 'outline-color' },
            { js: 'textDecorationColor', css: 'text-decoration-color' },
            { js: 'caretColor', css: 'caret-color' }
          ];

          const nodes: Element[] = [root, ...Array.from(root.querySelectorAll('*'))];
          for (const node of nodes) {
            const computed = view.getComputedStyle(node);
            const styledNode = node as Element & { style: CSSStyleDeclaration };

            for (const prop of colorProps) {
              const raw = String(computed[prop.js] || '');
              if (needsSanitize(raw)) {
                const rgb = toRgb(raw);
                if (rgb) {
                  styledNode.style.setProperty(prop.css, rgb, 'important');
                }
              }
            }

            const shadow = String(computed.boxShadow || '');
            if (needsSanitize(shadow)) {
              styledNode.style.setProperty('box-shadow', 'none', 'important');
            }

            const bgImage = String(computed.backgroundImage || '');
            if (needsSanitize(bgImage)) {
              styledNode.style.setProperty('background-image', 'none', 'important');
            }

            const filter = String(computed.filter || '');
            if (needsSanitize(filter)) {
              styledNode.style.setProperty('filter', 'none', 'important');
            }

            if (node instanceof view.SVGElement) {
              const fill = String(computed.getPropertyValue('fill') || '');
              if (needsSanitize(fill)) {
                const rgb = toRgb(fill);
                if (rgb) {
                  styledNode.style.setProperty('fill', rgb, 'important');
                }
              }

              const stroke = String(computed.getPropertyValue('stroke') || '');
              if (needsSanitize(stroke)) {
                const rgb = toRgb(stroke);
                if (rgb) {
                  styledNode.style.setProperty('stroke', rgb, 'important');
                }
              }

              const stopColor = String(computed.getPropertyValue('stop-color') || '');
              if (needsSanitize(stopColor)) {
                const rgb = toRgb(stopColor);
                if (rgb) {
                  styledNode.style.setProperty('stop-color', rgb, 'important');
                }
              }
            }
          }

          scratch.remove();
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Loontransparantie_Rapport_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Fout bij het genereren van de PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getGapColor = (gap: number | null) => {
    if (gap === null) return 'text-gray-400';
    return Math.abs(gap) > 5 ? 'text-red-600' : 'text-green-600';
  };

  // Real-time search effect
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = employees.filter(e => 
        e.id.toLowerCase().includes(query) || 
        (e.fullName && e.fullName.toLowerCase().includes(query))
      );
      setSearchResults(filtered.slice(0, 5)); // Toon max 5 resultaten in de dropdown
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, employees]);

  const selectEmployee = (emp: Employee) => {
    setSearchedEmployee(emp);
    setSearchQuery(emp.fullName || emp.id);
    setSearchResults([]);

    // 1. Company Average (All employees)
    const allWages = employees.map(e => e.totalHourlyWage);
    const companyAvg = calculateMean(allWages);
    const companyGap = calculateGap(companyAvg, emp.totalHourlyWage);

    // 2. Job Level Average (Same Category)
    const categoryWages = employees
        .filter(e => e.jobCategory === emp.jobCategory)
        .map(e => e.totalHourlyWage);
    const levelAvg = calculateMean(categoryWages);
    const levelGap = calculateGap(levelAvg, emp.totalHourlyWage);

    setEmployeeAnalysis({
        companyGap,
        levelGap,
        companyAvg,
        levelAvg
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const agentCommands: AgentCommand[] = [
    {
      id: 'cmd-age-now',
      title: 'Gemiddelde leeftijd nu',
      explanation: 'Laat direct de huidige gemiddelde leeftijd van actieve medewerkers zien.',
      question: 'Wat is de gemiddelde leeftijd van actieve medewerkers nu?',
      period: 'nu'
    },
    {
      id: 'cmd-age-last-year',
      title: 'Gemiddelde leeftijd vorig jaar',
      explanation: 'Toont dezelfde KPI op peildatum van één jaar geleden.',
      question: 'Wat was de gemiddelde leeftijd van actieve medewerkers vorig jaar?',
      period: 'vorig_jaar'
    },
    {
      id: 'cmd-age-trend',
      title: 'Trend gemiddelde leeftijd',
      explanation: 'Vergelijkt nu, vorig jaar en twee jaar geleden voor trendanalyse.',
      question: 'Laat de trend zien van de gemiddelde leeftijd van actieve medewerkers (nu, vorig jaar, twee jaar geleden).',
      period: 'trend'
    },
    {
      id: 'cmd-hours-now',
      title: 'Gemiddelde contracturen nu',
      explanation: 'Toont de gemiddelde contracturen per week van actieve medewerkers op dit moment.',
      question: 'Wat zijn de gemiddelde contracturen per week van actieve medewerkers nu?',
      period: 'nu'
    },
    {
      id: 'cmd-hours-last-year',
      title: 'Gemiddelde contracturen vorig jaar',
      explanation: 'Toont dezelfde KPI op peildatum van één jaar geleden.',
      question: 'Wat waren de gemiddelde contracturen per week van actieve medewerkers vorig jaar?',
      period: 'vorig_jaar'
    },
    {
      id: 'cmd-hours-trend',
      title: 'Trend gemiddelde contracturen',
      explanation: 'Vergelijkt gemiddelde contracturen over T-0, T-12 en T-24.',
      question: 'Laat de trend zien van gemiddelde contracturen per week van actieve medewerkers (nu, vorig jaar, twee jaar geleden).',
      period: 'trend'
    },
    {
      id: 'cmd-youngest-5',
      title: 'Jongste 5 medewerkers',
      explanation: 'Toont de jongste actieve medewerkers met naam en leeftijd.',
      question: 'Geef de jongste 5 medewerkers met hun leeftijd.',
      period: 'nu'
    },
    {
      id: 'cmd-oldest-5',
      title: 'Oudste 5 medewerkers',
      explanation: 'Toont de oudste actieve medewerkers met naam en leeftijd.',
      question: 'Geef de oudste 5 medewerkers met hun leeftijd.',
      period: 'nu'
    },
    {
      id: 'cmd-upcoming-birthdays',
      title: 'Komende verjaardagen (4 weken)',
      explanation: 'Toont komende verjaardagen in de komende 4 weken op datumvolgorde.',
      question: 'Geef de komende verjaardagen in de komende 4 weken, gesorteerd op datum van dichtbij tot veraf.',
      period: 'nu'
    }
  ];

  const copyCommandToChat = (command: AgentCommand) => {
    setAgentPeriod(command.period);
    setAgentQuestion(command.question);
  };

  const loadTechSpecsContent = async () => {
    setTechSpecsLoading(true);
    setTechSpecsError(null);
    try {
      const response = await fetch('/Tech%20specs.md', {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      if (!response.ok) {
        throw new Error('Tech specs document kon niet geladen worden.');
      }
      const text = await response.text();
      setTechSpecsContent(text);
    } catch (err: any) {
      setTechSpecsError(err.message || 'Onbekende fout tijdens laden van Tech specs document.');
    } finally {
      setTechSpecsLoading(false);
    }
  };

  const openTechSpecsModal = async () => {
    setShowTechSpecsModal(true);
    if (!techSpecsContent && !techSpecsLoading) {
      await loadTechSpecsContent();
    }
  };

  const loadHamContent = async () => {
    setHamLoading(true);
    setHamError(null);
    try {
      const response = await fetch('/HAM.xml', {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      if (!response.ok) {
        throw new Error('HAM document kon niet geladen worden.');
      }
      const text = await response.text();
      setHamContent(text);
    } catch (err: any) {
      setHamError(err.message || 'Onbekende fout tijdens laden van HAM document.');
    } finally {
      setHamLoading(false);
    }
  };

  const openHamModal = async () => {
    setShowHamModal(true);
    if (!hamContent && !hamLoading) {
      await loadHamContent();
    }
  };

  const renderDocumentPages = (content: string) => {
    const pages = content.split('<!-- PAGE BREAK -->').map((page) => page.trim()).filter((page) => page.length > 0);
    if (pages.length === 0) {
      return <div className="text-sm text-slate-500">Geen pagina-inhoud gevonden.</div>;
    }

    return (
      <div className="space-y-4">
        {pages.map((page, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 mb-2">Pagina {index + 1}</div>
            <pre className="whitespace-pre-wrap break-words text-[13px] leading-6 text-slate-700">{page}</pre>
          </div>
        ))}
      </div>
    );
  };

  const getIndicatorDotClass = (color: AgentIndicatorColor) => {
    if (color === 'green') return 'bg-green-500';
    if (color === 'yellow') return 'bg-yellow-500';
    if (color === 'red') return 'bg-red-500';
    return 'bg-slate-400';
  };

  const reorderExecutiveSummaryToBottom = (text: string) => {
    const lines = text.split('\n');
    const sectionIndices = {
      one: lines.findIndex((line) => line.trim().startsWith('1. Executive Summary')),
      two: lines.findIndex((line) => line.trim().startsWith('2. Kerncijfers')),
      three: lines.findIndex((line) => line.trim().startsWith('3. Analyse')),
      four: lines.findIndex((line) => line.trim().startsWith('4. Strategisch Advies'))
    };
    if (sectionIndices.one === -1 || sectionIndices.two === -1) {
      return text;
    }

    const allStarts = [sectionIndices.one, sectionIndices.two, sectionIndices.three, sectionIndices.four]
      .filter((index) => index !== -1)
      .sort((a, b) => a - b);
    const summaryStart = sectionIndices.one;
    const summaryStartPosition = allStarts.indexOf(summaryStart);
    const summaryEnd = summaryStartPosition >= 0 && summaryStartPosition < allStarts.length - 1 ? allStarts[summaryStartPosition + 1] : lines.length;
    const summaryBlock = lines.slice(summaryStart, summaryEnd);
    const withoutSummary = [...lines.slice(0, summaryStart), ...lines.slice(summaryEnd)];
    const trimmedMain = withoutSummary.join('\n').trim();
    return `${trimmedMain}\n\n${summaryBlock.join('\n').trim()}`.trim();
  };

  const renderAssistantContent = (content: string) => {
    const normalized = reorderExecutiveSummaryToBottom(content);
    const lines = normalized.split('\n');
    const blocks: Array<{ type: 'text'; lines: string[] } | { type: 'table'; rows: string[][] }> = [];
    let currentText: string[] = [];
    let currentTable: string[][] = [];

    const flushText = () => {
      if (currentText.length > 0) {
        blocks.push({ type: 'text', lines: currentText });
        currentText = [];
      }
    };

    const flushTable = () => {
      if (currentTable.length > 0) {
        blocks.push({ type: 'table', rows: currentTable });
        currentTable = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      const isTableLine = trimmed.startsWith('|') && trimmed.endsWith('|');
      if (isTableLine) {
        flushText();
        if (!trimmed.includes('---')) {
          const cells = trimmed
            .split('|')
            .map((part) => part.trim())
            .filter((part) => part.length > 0);
          if (cells.length > 0) {
            currentTable.push(cells);
          }
        }
      } else {
        flushTable();
        currentText.push(line);
      }
    }

    flushText();
    flushTable();

    return (
      <>
        {blocks.map((block, index) => {
          if (block.type === 'table') {
            const [header, ...rows] = block.rows;
            return (
              <div key={`table-${index}`} className="overflow-auto rounded-lg border border-slate-200 bg-white">
                <table className="min-w-full text-xs">
                  <thead className="bg-slate-100">
                    <tr>
                      {header?.map((cell, headerIndex) => (
                        <th key={headerIndex} className="px-3 py-2 text-left font-semibold text-slate-700 whitespace-nowrap">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-slate-200">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2 text-slate-700 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          const textValue = block.lines.join('\n').trim();
          if (!textValue) return null;
          const cleaned = textValue
            .replace(/\*\*/g, '')
            .replace(/^#{1,6}\s*/gm, '');
          return <div key={`text-${index}`} className="whitespace-pre-wrap text-sm leading-6">{cleaned}</div>;
        })}
      </>
    );
  };

  const getMonitorBadgeClass = (status: AgentApiCall['status']) => {
    if (status === 'success') return 'bg-green-100 text-green-700';
    if (status === 'error') return 'bg-red-100 text-red-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-slate-200 text-slate-700';
  };

  const renderVisibilitySwitch = (label: string, value: boolean, onToggle: () => void) => (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50"
    >
      <span className="text-[11px] font-semibold text-slate-700">{label}</span>
      <span className={`w-9 h-5 rounded-full relative transition-colors ${value ? 'bg-indigo-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'left-[18px]' : 'left-0.5'}`} />
      </span>
    </button>
  );

  const renderAgentModeButton = (mode: AgentQueryMode, label: string, description: string) => (
    <button
      type="button"
      onClick={() => setAgentQueryMode(mode)}
      className={`flex-1 rounded-xl border px-3 py-3 text-left transition ${
        agentQueryMode === mode
          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-1 text-xs text-slate-500">{description}</div>
    </button>
  );

  const submitAgentQuestion = async (questionOverride?: string, periodOverride?: AgentPeriod) => {
    const finalPeriod = periodOverride || agentPeriod;
    const finalQuestion = (questionOverride || agentQuestion).trim();
    if (!finalQuestion || agentLoading) return;

    const userMessage: AgentMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: finalQuestion
    };

    setAgentMessages((prev) => [...prev, userMessage]);
    setAgentQuestion('');
    setAgentLoading(true);
    setAgentError(null);
    setAgentApiCalls([
      { endpoint: 'Stap 1: Vraag ontvangen', status: 'success', records: 1, message: 'Vraag is verwerkt in de chat.' },
      { endpoint: 'Stap 2: API-route bepalen', status: 'pending', records: 0, message: `Beschikbare API endpoints worden gecontroleerd voor ${agentQueryMode === 'dynamic' ? 'dynamische' : 'statische'} modus.` },
      { endpoint: 'Stap 3: Data-analyse starten', status: 'pending', records: 0, message: 'Exact-data en snapshotberekening worden voorbereid.' },
      { endpoint: 'Stap 4: AI-rapport opstellen', status: 'pending', records: 0, message: 'Gemini bouwt het rapport op basis van HAM en YAML.' }
    ]);

    try {
      const apiCandidates = kpiAgentEndpointAvailable
        ? ['/api/kpi-agent/query']
        : [];
      setAgentApiCalls((prev) => prev.map((item, index) => index === 1 ? { ...item, status: 'info', records: apiCandidates.length, message: `${apiCandidates.length} endpoint(s) gevonden.` } : item));

      let payload: any = null;
      let lastErrorMessage = 'Geen data beschikbaar.';

      for (const apiUrl of apiCandidates) {
        setAgentApiCalls((prev) => prev.map((item, index) => index === 2 ? { ...item, status: 'info', message: `Analyse loopt via ${apiUrl}` } : item));
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
              question: finalQuestion,
              period: finalPeriod,
              answerLength,
              mode: agentQueryMode
            })
          });

          const rawText = await response.text();
          const isHtmlResponse = rawText.trimStart().startsWith('<!DOCTYPE') || rawText.trimStart().startsWith('<html');
          if (isHtmlResponse) {
            lastErrorMessage = `API-endpoint ${apiUrl} gaf HTML terug in plaats van JSON.`;
            continue;
          }

          let parsed: any = null;
          try {
            parsed = JSON.parse(rawText);
          } catch {
            lastErrorMessage = `API-endpoint ${apiUrl} gaf ongeldige JSON terug.`;
            continue;
          }

          if (!response.ok) {
            throw new Error(parsed?.error || 'De KPI-analyse kon niet worden uitgevoerd.');
          }

          payload = parsed;
          setAgentApiCalls((prev) => prev.map((item, index) => index === 3 ? { ...item, status: 'success', records: 1, message: 'AI-rapport succesvol ontvangen.' } : item));
          break;
        } catch (candidateError: any) {
          lastErrorMessage = candidateError?.message || 'Geen data beschikbaar.';
        }
      }

      if (!payload) {
        throw new Error('Geen data beschikbaar.');
      }

      const responseApiCalls = Array.isArray(payload.apiCalls) ? payload.apiCalls : [];
      setAgentApiCalls((prev) => [
        ...prev.map((item, index) => (index === 2 ? { ...item, status: 'success', records: item.records || 1 } : item)),
        ...responseApiCalls
      ]);
      const answerText = typeof payload.answer === 'string' ? payload.answer : 'Geen antwoord ontvangen.';
      const assistantId = `${Date.now()}-assistant`;
      const assistantMessage: AgentMessage = {
        id: assistantId,
        role: 'assistant',
        content: answerText
      };
      setAgentMessages((prev) => [...prev, assistantMessage]);
      setLatestAssistantMessageId(assistantId);
      setShowLatestAssistantHighlight(true);
      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
      }, 0);
    } catch (err: any) {
      const errorText = 'Geen data beschikbaar.';
      setAgentError(errorText);
      setAgentApiCalls((prev) => prev.map((item) => item.status === 'pending' || item.status === 'info' ? { ...item, status: 'error', message: errorText } : item));
      setAgentMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant-error`,
          role: 'assistant',
          content: errorText
        }
      ]);
    } finally {
      setAgentLoading(false);
    }
  };

  if (isAuthenticated === null) return <div className="flex h-screen items-center justify-center">Authenticatie controleren...</div>;
  
  // Stap 1: Als de gebruiker niet is ingelogd in de applicatie (zou afgehandeld moeten zijn door App.tsx)
  if (!isAuthenticated) return <div className="flex h-screen items-center justify-center">Geen toegang tot de applicatie. Log opnieuw in.</div>;

  // Stap 2: Als de gebruiker wel in de app is, maar nog niet gekoppeld met Exact Online
  if (!isExactAuthenticated) return <IntroPage onLogout={onAppLogout} />;

  // Stap 3: Als de gebruiker is gekoppeld, maar nog geen administratie heeft gekozen
  if (!hasDivision) return <DivisionSelector onDivisionSelected={handleDivisionSelected} onExactLogout={handleExactLogout} />;

  if (!selectedFunctionality) {
    const lockedForSeconds = kpiAgentLockedUntil && kpiAgentLockedUntil > Date.now()
      ? Math.ceil((kpiAgentLockedUntil - Date.now()) / 1000)
      : 0;

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">Kies functionaliteit</h2>
          <p className="text-center text-gray-500 mb-8">Selecteer waarmee je verder wilt werken in deze administratie.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <button
              onClick={() => handleFunctionalitySelected('loontransparantie')}
              className="w-full text-left p-6 border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <BarChart2 className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Loontransparantie</h3>
              </div>
              <p className="text-sm text-gray-600">Bestaande dashboard- en rapportagefunctionaliteit voor LOONVERSCHILLEN MAN/VROUW.</p>
            </button>

            <button
              onClick={() => handleFunctionalitySelected('kpi_agent')}
              className="w-full text-left p-6 border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <Bot className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">HR & Payroll KPI Agent</h3>
              </div>
              <p className="text-sm text-gray-600">Nieuw agent-scherm met chat, KPI-overzicht en background monitor.</p>
            </button>
          </div>
        </div>

        {showKpiAgentPinModal && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/70 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Beveiliging HR & Payroll KPI Agent</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Voer de 4-cijferige pincode in om deze functionaliteit te openen.
                  </p>
                </div>
                <button
                  onClick={() => setShowKpiAgentPinModal(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Sluit pincode scherm"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {kpiAgentPinConfigured === false && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  Error: PINCODE ontbreekt of is ongeldig in de serverconfiguratie.
                </div>
              )}

              {kpiAgentPinError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {kpiAgentPinError}
                </div>
              )}

              <form className="mt-6 space-y-4" onSubmit={unlockKpiAgent}>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Pincode</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    maxLength={4}
                    value={kpiAgentPin}
                    onChange={(event) => setKpiAgentPin(event.target.value.replace(/\\D/g, '').slice(0, 4))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg tracking-[0.4em] outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="0000"
                    disabled={kpiAgentPinConfigured === false || kpiAgentPinLoading || lockedForSeconds > 0}
                    required
                  />
                </div>

                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  <div>Resterende pogingen: {typeof kpiAgentAttemptsRemaining === 'number' ? kpiAgentAttemptsRemaining : '-'}</div>
                  {lockedForSeconds > 0 && (
                    <div className="mt-2 text-red-600">Tijdelijke blokkade actief: nog {lockedForSeconds} seconden.</div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={kpiAgentPinConfigured === false || kpiAgentPinLoading || lockedForSeconds > 0 || kpiAgentPin.length !== 4}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {kpiAgentPinLoading ? 'Pincode controleren...' : 'Open KPI Agent'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (selectedFunctionality === 'kpi_agent') {
    const rawMiddlePanelWidth = 100 - leftPanelWidth - rightPanelWidth;
    const showMiddleContainer = showKpiParametersPanel || showYamlPanel;
    const visibleWeightLeft = showApiMonitorPanel ? leftPanelWidth : 0;
    const visibleWeightMiddle = showMiddleContainer ? rawMiddlePanelWidth : 0;
    const visibleWeightRight = rightPanelWidth;
    const visibleWeightTotal = visibleWeightLeft + visibleWeightMiddle + visibleWeightRight;
    const computedLeftPanelWidth = showApiMonitorPanel ? (visibleWeightLeft / visibleWeightTotal) * 100 : 0;
    const computedMiddlePanelWidth = showMiddleContainer ? (visibleWeightMiddle / visibleWeightTotal) * 100 : 0;
    const computedRightPanelWidth = (visibleWeightRight / visibleWeightTotal) * 100;
    const showLeftDivider = showApiMonitorPanel && showMiddleContainer;
    const showRightDivider = showMiddleContainer;
    const showMiddleDivider = showKpiParametersPanel && showYamlPanel;
    const quickQuestionChips = agentCommands.slice(0, 6);

    return (
      <div className="fixed inset-0 z-50 bg-slate-100">
        <style>{`
          @keyframes agentPulseSweep {
            0% { transform: translateX(-140%); opacity: 0; }
            30% { opacity: 0.95; }
            100% { transform: translateX(220%); opacity: 0; }
          }
        `}</style>
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-gray-900">HR & Payroll KPI Agent</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowKpiBuilderWizard(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-indigo-200 rounded-md text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
              >
                <ShieldCheck className="w-4 h-4" />
                KPI Wizard
              </button>
              {renderVisibilitySwitch('Monitor', showApiMonitorPanel, () => setShowApiMonitorPanel((prev) => !prev))}
              {renderVisibilitySwitch('Parameters', showKpiParametersPanel, () => setShowKpiParametersPanel((prev) => !prev))}
              {renderVisibilitySwitch('YAML', showYamlPanel, () => setShowYamlPanel((prev) => !prev))}
              <button
                onClick={() => setSelectedFunctionality(null)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                Sluiten
              </button>
            </div>
          </div>

          <div ref={agentLayoutRef} className="flex-1 min-h-0 flex">
            {showApiMonitorPanel && (
            <div style={{ width: `${computedLeftPanelWidth}%` }} className="min-h-0 p-4">
              <div className="h-full bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-base font-semibold text-gray-900">Live API Monitor</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Backend status</span>
                      <span className="inline-flex items-center gap-2 text-xs text-slate-700">
                        <span className={`w-2.5 h-2.5 rounded-full ${getIndicatorDotClass(backendIndicatorColor)}`} />
                        {backendIndicatorText}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">API readiness</span>
                      <span className="inline-flex items-center gap-2 text-xs text-slate-700">
                        <span className={`w-2.5 h-2.5 rounded-full ${getIndicatorDotClass(apiIndicatorColor)}`} />
                        {apiIndicatorText}
                      </span>
                    </div>
                  </div>
                  {agentApiCalls.length === 0 && (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                      Nog geen API-calls zichtbaar. Start een KPI-vraag om live calls te tonen.
                    </div>
                  )}
                  {agentApiCalls.map((call, index) => (
                    <div key={`${call.endpoint}-${index}`} className="rounded-lg border border-slate-200 p-3">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className="text-xs font-semibold text-slate-600">{call.endpoint}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getMonitorBadgeClass(call.status)}`}>
                          {call.status === 'success' ? 'OK' : call.status === 'error' ? 'Fout' : call.status === 'pending' ? 'Wachten' : 'Info'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">Records: {call.records}</div>
                      {call.message && <div className="text-xs text-slate-600 mt-1 break-words">{call.message}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {showLeftDivider && (
              <div
                onMouseDown={() => setActiveDivider('left')}
                className="w-2 cursor-col-resize flex items-stretch justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <div className="w-px bg-slate-300" />
              </div>
            )}

            {showMiddleContainer && (
            <div ref={middlePanelRef} style={{ width: `${computedMiddlePanelWidth}%` }} className="min-h-0 p-4">
              <div className="h-full bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-base font-semibold text-gray-900">{showKpiParametersPanel ? 'KPI Parameters' : 'YAML Viewer'}</h2>
                  {showKpiParametersPanel && (
                    <button
                      onClick={() => setShowInstructionPanel((prev) => !prev)}
                      className="ml-auto px-2.5 py-1 rounded-md border border-indigo-200 text-indigo-700 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100"
                    >
                      {showInstructionPanel ? 'Verberg instructie' : 'Lees instructie'}
                    </button>
                  )}
                </div>
                <div className="flex-1 min-h-0 flex flex-col">
                  {showKpiParametersPanel && (
                  <div style={{ height: showYamlPanel ? `${middleTopHeight}%` : '100%' }} className="min-h-0 p-4 overflow-y-auto space-y-3">
                    {showInstructionPanel && (
                      <div className="rounded-xl border border-slate-300 bg-white p-3">
                        <div className="text-xs font-semibold text-slate-700 mb-2">Systeeminstructie chat-agent</div>
                        <pre className="text-[11px] leading-5 text-slate-700 whitespace-pre-wrap break-words">{STRATEGIC_HR_AGENT_INSTRUCTION}</pre>
                      </div>
                    )}
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                      <h3 className="text-sm font-bold text-indigo-900 mb-2">Beschikbare commando's</h3>
                      <p className="text-sm text-indigo-800 mb-4">Kies een opdracht en zet die direct in de chat of start direct de analyse.</p>
                      <div className="space-y-3">
                        {agentCommands.map((command) => (
                          <div key={command.id} className="rounded-lg bg-white border border-indigo-200 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-semibold text-indigo-900">{command.title}</div>
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase">{command.period}</span>
                            </div>
                            <div className="text-xs text-slate-600 mt-1">{command.explanation}</div>
                            <div className="text-xs text-slate-500 mt-2">{command.question}</div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <button
                                onClick={() => copyCommandToChat(command)}
                                className="px-3 py-1.5 rounded-md border border-indigo-300 text-indigo-700 bg-indigo-50 text-xs font-semibold hover:bg-indigo-100"
                              >
                                Kopie naar chat
                              </button>
                              <button
                                onClick={() => submitAgentQuestion(command.question, command.period)}
                                disabled={agentLoading}
                                className="px-3 py-1.5 rounded-md border border-transparent bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50"
                              >
                                Start analyse
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  )}
                  {showMiddleDivider && (
                    <div
                      onMouseDown={() => setActiveDivider('middle')}
                      className="h-2 cursor-row-resize flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <div className="h-px w-16 bg-slate-300" />
                    </div>
                  )}
                  {showYamlPanel && (
                  <div style={{ height: showKpiParametersPanel ? `${100 - middleTopHeight}%` : '100%' }} className="min-h-0 p-4 overflow-y-auto">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 h-full flex flex-col">
                      <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-slate-700">yaml.json (readonly)</h4>
                        <div className="flex items-center gap-2">
                          <a
                            href="/yaml.json"
                            download="yaml.json"
                            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                          >
                            Download YAML
                          </a>
                          <a
                            href="/Tech%20specs.md"
                            download="Tech specs.md"
                            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                          >
                            Download Tech
                          </a>
                          <button
                            onClick={openTechSpecsModal}
                            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                          >
                            Open Tech
                          </button>
                          <a
                            href="/HAM.xml"
                            download="HAM.xml"
                            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                          >
                            Download HAM
                          </a>
                          <button
                            onClick={openHamModal}
                            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                          >
                            Open HAM
                          </button>
                          <button
                            onClick={() => setAgentMessages((prev) => [
                              ...prev,
                              {
                                id: `${Date.now()}-assistant-ham-info`,
                                role: 'assistant',
                                content: 'HAM is een HR Analysis Model in XML-structuur. In dit project gebruiken we HAM.xml als datamodel voor snapshots per peildatum. Het is dus een XML-model (geen XSD-bestand), met velden zoals medewerker-identificatie, dienstverbanden, capaciteit en operationele data.'
                              }
                            ])}
                            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                          >
                            HAM: wat is dit?
                          </button>
                        </div>
                      </div>
                      <div className="p-3 flex-1 overflow-auto">
                        {yamlLoading && <div className="text-xs text-slate-500">yaml.json laden...</div>}
                        {yamlError && <div className="text-xs text-red-600">{yamlError}</div>}
                        {!yamlLoading && !yamlError && (
                          <pre className="text-[11px] leading-5 text-slate-700 whitespace-pre-wrap break-words">{yamlContent}</pre>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">
                      Download instructie: gebruik "Download YAML", "Download Tech" of "Download HAM" om de actuele documentatie lokaal op te slaan.
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {showRightDivider && (
              <div
                onMouseDown={() => setActiveDivider('right')}
                className="w-2 cursor-col-resize flex items-stretch justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <div className="w-px bg-slate-300" />
              </div>
            )}

            <div style={{ width: `${computedRightPanelWidth}%` }} className="min-h-0 p-4">
              <div className="h-full bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-700" />
                    </div>
                    <span className="text-base font-semibold text-gray-900">Exact Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setAgentMessages([
                          {
                            id: 'intro',
                            role: 'assistant',
                            content: 'Chat geleegd. Stel je volgende KPI-vraag.'
                          }
                        ]);
                        setLatestAssistantMessageId(null);
                        setShowLatestAssistantHighlight(false);
                        setAgentApiCalls([]);
                        setAgentError(null);
                      }}
                      className="px-2.5 py-1 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Leeg chat
                    </button>
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div ref={chatScrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
                  {agentMessages.length <= 1 && (
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 mb-4">
                      <div className="text-3xl font-bold text-slate-900 leading-tight">Hallo! Ik ben Exact Assistant, jouw AI-gedreven assistent.</div>
                      <div className="mt-8 text-sm font-semibold text-slate-800">Veelgestelde vragen</div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {quickQuestionChips.map((command) => (
                          <button
                            key={`chip-${command.id}`}
                            onClick={() => copyCommandToChat(command)}
                            className="text-left rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-sm text-sky-900 hover:bg-sky-100"
                          >
                            {command.question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {agentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`max-w-[90%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap transition-colors ${
                        message.role === 'user'
                          ? 'ml-auto bg-indigo-600 text-white'
                          : message.id === latestAssistantMessageId && showLatestAssistantHighlight
                            ? 'mr-auto bg-green-50 border border-green-300 text-slate-800'
                            : 'mr-auto bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      {message.role === 'assistant' ? renderAssistantContent(message.content) : message.content}
                    </div>
                  ))}
                  {agentLoading && (
                    <div className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-sm">
                      <div className="text-xs font-semibold text-slate-500 mb-2">Analyse wordt uitgevoerd...</div>
                      <div className="space-y-2 w-full">
                        {[1.2, 1.7, 2.1].map((speed, index) => (
                          <div key={index} className="relative h-2 rounded-full overflow-hidden bg-slate-200">
                            <div
                              className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-slate-600/70 to-transparent blur-[1px]"
                              style={{ animation: `agentPulseSweep ${speed}s ease-in-out infinite` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-4 py-3 border-t border-slate-200 bg-white">
                  <div className="mb-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-600">Analysemodus</span>
                      <span className="text-[11px] text-slate-500">
                        {agentQueryMode === 'dynamic' ? 'Nieuwe YAML-gestuurde methode' : 'Bestaande vaste methode'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {renderAgentModeButton('static', 'Statisch', 'Behoudt de bestaande vaste KPI-herkenning en rapportage.')}
                      {renderAgentModeButton('dynamic', 'Dynamisch', 'Leest KPI-definities uit yaml.json en gebruikt nieuwe wizard-KPI’s.')}
                    </div>
                  </div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-600">Lengte antwoord</span>
                    <div className="inline-flex rounded-md border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => setAnswerLength('kort')}
                        className={`px-3 py-1 text-xs font-semibold ${answerLength === 'kort' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                      >
                        Kort
                      </button>
                      <button
                        onClick={() => setAnswerLength('lang')}
                        className={`px-3 py-1 text-xs font-semibold ${answerLength === 'lang' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                      >
                        Lang
                      </button>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-100 p-2 flex items-end gap-2">
                    <textarea
                      value={agentQuestion}
                      onChange={(event) => setAgentQuestion(event.target.value)}
                      placeholder="Stel een vraag over gemiddelde leeftijd of gemiddelde contracturen..."
                      rows={3}
                      className="flex-1 bg-transparent resize-y min-h-[76px] max-h-[220px] outline-none text-sm text-slate-700 placeholder:text-slate-400 px-2 py-1"
                    />
                    <button
                      onClick={() => submitAgentQuestion()}
                      disabled={agentLoading || !agentQuestion.trim()}
                      className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50"
                    >
                      <SendHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  {agentError && <div className="text-xs text-red-600 mt-2">{agentError}</div>}
                  <div className="text-center text-xs text-slate-400 pt-3">
                    Door AI gegenereerde antwoorden kunnen fouten bevatten.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showTechSpecsModal && (
          <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-5xl max-h-[88vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Tech specs document</h3>
                  <p className="text-xs text-slate-500">Procesbeschrijving per KPI met API, XML, YAML en transformatieflow.</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/Tech%20specs.md"
                    download="Tech specs.md"
                    className="px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setShowTechSpecsModal(false)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-3.5 h-3.5" />
                    Sluiten
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
                {techSpecsLoading && <div className="text-sm text-slate-500">Tech specs laden...</div>}
                {techSpecsError && <div className="text-sm text-red-600">{techSpecsError}</div>}
                {!techSpecsLoading && !techSpecsError && renderDocumentPages(techSpecsContent)}
              </div>
            </div>
          </div>
        )}
        {showHamModal && (
          <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-5xl max-h-[88vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">HAM XML document</h3>
                  <p className="text-xs text-slate-500">HAM.xml is het snapshot datamodel voor medewerker-, dienstverband- en capaciteitsdata.</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/HAM.xml"
                    download="HAM.xml"
                    className="px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setShowHamModal(false)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-3.5 h-3.5" />
                    Sluiten
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
                {hamLoading && <div className="text-sm text-slate-500">HAM document laden...</div>}
                {hamError && <div className="text-sm text-red-600">{hamError}</div>}
                {!hamLoading && !hamError && renderDocumentPages(hamContent)}
              </div>
            </div>
          </div>
        )}
        <KpiBuilderWizard open={showKpiBuilderWizard} onClose={() => setShowKpiBuilderWizard(false)} />
      </div>
    );
  }

  // Stap 4: Data laden
  if (loading && !report) return <div className="flex h-screen items-center justify-center">Data ophalen uit Exact Online...</div>;

  if (error) return (
    <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded">Opnieuw proberen</button>
    </div>
  );

  if (!report) return <div className="flex h-screen items-center justify-center">Geen data beschikbaar.</div>;

  const overallTotalEmployees = report.totalEmployees;
  const overallMalePercentage = overallTotalEmployees > 0 ? parseFloat(((report.maleCount / overallTotalEmployees) * 100).toFixed(1)) : 0;
  const overallFemalePercentage = overallTotalEmployees > 0 ? parseFloat(((report.femaleCount / overallTotalEmployees) * 100).toFixed(1)) : 0;
  const overallOtherPercentage = overallTotalEmployees > 0 ? parseFloat(((report.otherCount / overallTotalEmployees) * 100).toFixed(1)) : 0;
  const genderPieData = [
    { label: 'Man', value: report.maleCount, color: '#3b82f6' },
    { label: 'Vrouw', value: report.femaleCount, color: '#ec4899' },
    { label: 'X', value: report.otherCount, color: '#8b5cf6' }
  ];
  const departmentTotal = report.departmentGenderBreakdown.length;
  const unknownDepartmentEmployees =
    report.departmentGenderBreakdown.find((d) => d.department === 'Onbekend')?.totalEmployees || 0;
  const smallDepartmentCount = report.departmentGenderBreakdown.filter((d) => d.totalEmployees < 5).length;

  return (
    <div className="min-h-screen bg-slate-50 print-p-0">
      {/* Navbar */}
      <nav className={`bg-white border-b border-gray-200 sticky top-0 z-10 ${isGeneratingPDF ? 'hidden' : 'no-print'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:flex-nowrap justify-between items-center py-3 md:h-16 md:py-0 gap-3 md:gap-4">
            <div className="flex items-center mb-3 md:mb-0 w-full md:w-auto">
              <PieChart className="h-8 w-8 text-indigo-600 mr-2 flex-shrink-0" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Monitor Loontransparantie</h1>
                <p className="text-xs text-gray-500">Conform EU Richtlijn 2023/970</p>
              </div>
            </div>
            
            {/* View Switcher Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto md:mx-2 lg:mx-4 overflow-x-auto">
                <button
                    onClick={() => setViewMode('dashboard')}
                    className={`px-2.5 py-1.5 text-sm font-medium rounded-md flex items-center whitespace-nowrap ${viewMode === 'dashboard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Dashboard
                </button>
                <button
                    onClick={() => setViewMode('explanation')}
                    className={`px-2.5 py-1.5 text-sm font-medium rounded-md flex items-center whitespace-nowrap ${viewMode === 'explanation' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">Uitleg Rapport</span>
                    <span className="lg:hidden">Uitleg</span>
                </button>
                <button
                    onClick={() => setViewMode('employee_check')}
                    className={`px-2.5 py-1.5 text-sm font-medium rounded-md flex items-center whitespace-nowrap ${viewMode === 'employee_check' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">Medewerker Check</span>
                    <span className="lg:hidden">Medewerker</span>
                </button>
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
              <button 
                onClick={onAppLogout}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Uitloggen</span>
              </button>

              <button 
                onClick={() => {
                  setHasDivision(false);
                  setSelectedFunctionality(null);
                }}
                disabled={isGeneratingPDF || loading}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Wissel</span>
              </button>

              <button 
                onClick={fetchData}
                disabled={isGeneratingPDF || loading}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isGeneratingPDF || loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Ververs</span>
              </button>

              <button 
                onClick={() => setShowDataset(true)}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <TableIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Data</span>
              </button>
              
              <button 
                onClick={handlePrint}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <Printer className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                {isGeneratingPDF ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                    <Download className="h-4 w-4 mr-2" />
                )}
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dataset Modal */}
      {showDataset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
             <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                <div>
                   <h2 className="text-lg font-bold text-gray-900">Dataset Details</h2>
                   <p className="text-sm text-gray-500">{employees.length} records</p>
                </div>
                <button 
                  onClick={() => setShowDataset(false)} 
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
             </div>
             <div className="overflow-auto p-0 flex-1">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                   <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geslacht</th>
                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leeftijd</th>
                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categorie</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AJE</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">JAARUREN</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">BASIS-UURLOON</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">WAARDE AANVULLENDE OF VARIABELE COMPONENTEN/u</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAAL/u</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">BRUTOJAARLOON</th>
                      </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                      {employees.map((emp, idx) => (
                         <tr key={emp.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                            <td className="px-4 py-2 whitespace-nowrap font-mono text-xs">{emp.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{emp.fullName || '-'}</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getGenderBadgeClasses(emp.gender)}`}>
                                  {emp.gender}
                               </span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">{emp.age}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs">{emp.jobCategory}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-center">{emp.fte.toFixed(2)}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right">{emp.annualHours}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right">€ {emp.baseHourlyWage.toFixed(2)}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right text-gray-500">€ {emp.variableHourlyComponent.toFixed(2)}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right font-medium">€ {emp.totalHourlyWage.toFixed(2)}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-right font-semibold text-gray-700">€ {emp.grossAnnualWage.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="p-4 border-t bg-gray-50 rounded-b-lg text-right">
                <button 
                   onClick={() => setShowDataset(false)}
                   className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                   Sluiten
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print-p-0">
        
        {/* VIEW: EMPLOYEE CHECK */}
        {viewMode === 'employee_check' && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <User className="w-6 h-6 mr-2 text-indigo-600" />
                    Medewerker Check
                </h2>
                
                <div className="relative mb-8">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                placeholder="Zoek op naam of ID..." 
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {searchResults.map((emp) => (
                                <button
                                    key={emp.id}
                                    onClick={() => selectEmployee(emp)}
                                    className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center justify-between border-b border-gray-50 last:border-0"
                                >
                                    <div>
                                        <div className="font-medium text-gray-900">{emp.fullName || emp.id}</div>
                                        <div className="text-xs text-gray-500">{emp.jobCategory} • {emp.id}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getGenderBadgeClasses(emp.gender)}`}>
                                        {emp.gender}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {searchedEmployee && employeeAnalysis && (
                    <div className={`border-2 rounded-xl p-6 ${getGenderTheme(searchedEmployee.gender).container}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className={`text-xl font-bold ${getGenderTheme(searchedEmployee.gender).heading}`}>
                                    {searchedEmployee.fullName || `Medewerker ${searchedEmployee.id}`}
                                </h3>
                                <p className="text-sm opacity-75">{searchedEmployee.jobCategory}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGenderTheme(searchedEmployee.gender).pill}`}>
                                {searchedEmployee.gender}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-xs text-gray-500 uppercase">Huidig Uurloon (Totaal)</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(searchedEmployee.totalHourlyWage)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-xs text-gray-500 uppercase">Variabele Beloning</p>
                                <p className={`text-xl font-bold ${searchedEmployee.variableHourlyComponent > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                                    {searchedEmployee.variableHourlyComponent > 0 ? 'Ja' : 'Nee'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-gray-700">LOONVERSCHILLEN MAN/VROUW (Gehele bedrijf)</span>
                                    <span className={`font-bold ${employeeAnalysis.companyGap > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                        {employeeAnalysis.companyGap > 0 ? '-' : '+'}{Math.abs(employeeAnalysis.companyGap)}%
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Ten opzichte van het bedrijfs-gemiddelde ({formatCurrency(employeeAnalysis.companyAvg)})
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-gray-700">LOONVERSCHILLEN MAN/VROUW (Functieniveau)</span>
                                    <span className={`font-bold ${employeeAnalysis.levelGap > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                        {employeeAnalysis.levelGap > 0 ? '-' : '+'}{Math.abs(employeeAnalysis.levelGap)}%
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Ten opzichte van het gemiddelde in categorie '{searchedEmployee.jobCategory}' ({formatCurrency(employeeAnalysis.levelAvg)})
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* VIEW: EXPLANATION REPORT */}
        {viewMode === 'explanation' && (
            <div ref={reportRef} id="pdf-root" className={`${isGeneratingPDF ? 'p-8 bg-white' : ''}`}>
                <EmployeeReport report={report} />
                <div className={`mt-8 text-center text-xs text-gray-400 ${isGeneratingPDF ? 'block' : 'no-print'}`}>
                    <p>Gegenereerd door Monitor Loontransparantie. Data afkomstig uit Exact Online.</p>
                </div>
            </div>
        )}

        {/* VIEW: DASHBOARD (Original) */}
        {viewMode === 'dashboard' && (
        <div ref={reportRef} id="pdf-root" className={`${isGeneratingPDF ? 'p-8 bg-white' : ''}`}>

          {/* Report Header */}
          <div className={`${isGeneratingPDF ? 'block' : 'hidden print:block'} mb-8 border-b pb-4`}>
              <div className="flex items-center mb-4">
                 <PieChart className="h-10 w-10 text-indigo-600 mr-4" />
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900">Rapportage Loontransparantie</h1>
                    <p className="text-gray-600">Conform Richtlijn (EU) 2023/970</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Datum rapportage: <span className="font-semibold text-gray-900">{new Date().toLocaleDateString('nl-NL')}</span></div>
                  <div>Aantal werknemers: <span className="font-semibold text-gray-900">{report.totalEmployees}</span></div>
                  <div>Bron: <span className="font-semibold text-gray-900">Exact Online Live Data</span></div>
              </div>
          </div>

          {/* Intro Context */}
          <div className="mb-6 print-break-inside">
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                   <h3 className="text-sm font-semibold text-gray-700">Totaal Aantal Werknemers</h3>
                   <p className="text-xs text-gray-500">Populatie in deze analyse (Man: {report.maleCount}, Vrouw: {report.femaleCount}, X: {report.otherCount})</p>
                   <p className="text-xs text-gray-500">Let op: LOONVERSCHILLEN MAN/VROUW berekeningen zijn gebaseerd op Man en Vrouw (n={report.binaryCount}).</p>
                </div>
                <div className="text-2xl font-bold text-gray-900">{report.totalEmployees}</div>
             </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Rapportage Onderdelen</h2>

          {/* A t/m D Grid */}
          <div className="space-y-6 mb-8 print-break-inside">
            {/* A */}
            <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Groep A: LOONVERSCHILLEN MAN/VROUW (Gemiddeld)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard 
                        title="a.1) LOONVERSCHILLEN MAN/VROUW (BRUTOJAARLOON)" 
                        value={`${report.meanGapAnnualTotal}%`} 
                        description="Verschil in GEMIDDELD BRUTOJAARLOON."
                        valueClassName={getGapColor(report.meanGapAnnualTotal)}
                        formula="(Gem. BRUTOJAARLOON M - Gem. BRUTOJAARLOON V) / Gem. BRUTOJAARLOON M * 100"
                    />
                    <MetricCard 
                        title="a.2) LOONVERSCHILLEN MAN/VROUW (BRUTO-UURLOON)" 
                        value={`${report.meanGapTotal}%`} 
                        description="Verschil in GEMIDDELD BRUTO-UURLOON."
                        valueClassName={getGapColor(report.meanGapTotal)}
                        formula="(Gem. BRUTO-UURLOON M - Gem. BRUTO-UURLOON V) / Gem. BRUTO-UURLOON M * 100"
                    />
                </div>
            </div>

            {/* B */}
            <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Groep B: WAARDE AANVULLENDE OF VARIABELE COMPONENTEN (Gemiddeld)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <MetricCard 
                      title="b.1) WAARDE AANVULLENDE OF VARIABELE COMPONENTEN (Jaar)" 
                      value={`${report.meanGapAnnualVariable}%`} 
                      description="Verschil in gemiddelde jaarlijkse waarde van aanvullende of variabele componenten."
                      valueClassName={getGapColor(report.meanGapAnnualVariable)}
                      formula="(Gem. Jaar Variabel M - Gem. Jaar Variabel V) / Gem. Jaar Variabel M * 100"
                    />
                    <MetricCard 
                      title="b.2) WAARDE AANVULLENDE OF VARIABELE COMPONENTEN (Uur)" 
                      value={`${report.meanGapVariable}%`} 
                      description="Verschil in gemiddelde waarde van aanvullende of variabele componenten per uur."
                      valueClassName={getGapColor(report.meanGapVariable)}
                      formula="(Gem. Uur Variabel M - Gem. Uur Variabel V) / Gem. Uur Variabel M * 100"
                    />
                </div>
            </div>
            
            {/* C */}
            <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Groep C: LOONVERSCHILLEN MAN/VROUW (Mediaan)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard 
                      title="c.1) LOONVERSCHILLEN MAN/VROUW (BRUTOJAARLOON)" 
                      value={`${report.medianGapAnnualTotal}%`} 
                      description="Verschil in mediaan BRUTOJAARLOON."
                      valueClassName={getGapColor(report.medianGapAnnualTotal)}
                      formula="(Mediaan BRUTOJAARLOON M - Mediaan BRUTOJAARLOON V) / Mediaan BRUTOJAARLOON M * 100"
                    />
                    <MetricCard 
                      title="c.2) LOONVERSCHILLEN MAN/VROUW (BRUTO-UURLOON)" 
                      value={`${report.medianGapTotal}%`} 
                      description="Verschil in mediaan BRUTO-UURLOON."
                      valueClassName={getGapColor(report.medianGapTotal)}
                      formula="(Mediaan Uurloon M - Mediaan Uurloon V) / Mediaan Uurloon M * 100"
                    />
                </div>
            </div>

            {/* D */}
            <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Groep D: Kloof Variabel (Mediaan)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard 
                       title="d.1) Kloof Variabel (Jaarloon)" 
                       value={`${report.medianGapAnnualVariable}%`} 
                       description="Verschil in mediane jaarlijkse variabele componenten."
                       valueClassName={getGapColor(report.medianGapAnnualVariable)}
                       formula="(Mediaan Jaar Variabel M - Mediaan Jaar Variabel V) / Mediaan Jaar Variabel M * 100"
                    />
                    <MetricCard 
                       title="d.2) Kloof Variabel (Uurloon)" 
                       value={`${report.medianGapVariable}%`} 
                       description="Verschil in mediane variabele componenten per uur."
                       valueClassName={getGapColor(report.medianGapVariable)}
                       formula="(Mediaan Uur Variabel M - Mediaan Uur Variabel V) / Mediaan Uur Variabel M * 100"
                    />
                </div>
            </div>
          </div>

          {/* E */}
          <div className="mb-8 print-break-inside">
             <h3 className="text-md font-bold text-gray-900 mb-4">e) Aandeel met Variabele Beloning</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard 
                  title="Mannen (Aandeel)" 
                  value={`${report.percentReceivingVariableMale}%`} 
                  description="Percentage mannelijke werknemers dat variabel ontvangt."
                />
                <MetricCard 
                  title="Vrouwen (Aandeel)" 
                  value={`${report.percentReceivingVariableFemale}%`} 
                  description="Percentage vrouwelijke werknemers dat variabel ontvangt."
                />
             </div>
          </div>

          {/* F */}
          <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm print-break-inside">
             <h3 className="text-md font-bold text-gray-900 mb-2">f) Verdeling per Kwartiel</h3>
             <p className="text-xs text-gray-500 mb-6">Percentage mannelijke en vrouwelijke werknemers in elke kwartielbeloningsschaal.</p>
             <QuartileChart data={report.quartiles} />
          </div>

          {/* G */}
          <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm print-break-inside">
              <h3 className="text-md font-bold text-gray-900 mb-2">g) LOONVERSCHILLEN MAN/VROUW per Categorie</h3>
              <p className="text-xs text-gray-500 mb-6">LOONVERSCHILLEN MAN/VROUW uitgesplitst naar categorie, BASIS-UURLOON en WAARDE AANVULLENDE OF VARIABELE COMPONENTEN.</p>
              
              <CategoryGapChart data={report.categoryGaps} />

              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Categorie</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Basis (Uur)</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Variabel (Uur)</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Totaal (Uur)</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Totaal (Jaar)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {report.categoryGaps.map((cat, idx) => (
                      <tr key={cat.category} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{cat.category}</td>
                        <td className={`px-4 py-3 whitespace-nowrap text-right font-bold ${cat.meanGapBase === null ? 'text-gray-400' : getGapColor(cat.meanGapBase)}`}>
                           {cat.meanGapBase === null ? 'N/v' : `${cat.meanGapBase}%`}
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap text-right font-bold ${cat.meanGapVariable === null ? 'text-gray-400' : getGapColor(cat.meanGapVariable)}`}>
                           {cat.meanGapVariable === null ? 'N/v' : `${cat.meanGapVariable}%`}
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap text-right font-bold ${cat.meanGapTotal === null ? 'text-gray-400' : getGapColor(cat.meanGapTotal)}`}>
                           {cat.meanGapTotal === null ? 'N/v' : `${cat.meanGapTotal}%`}
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap text-right font-bold ${cat.meanGapAnnualTotal === null ? 'text-gray-400' : getGapColor(cat.meanGapAnnualTotal)}`}>
                           {cat.meanGapAnnualTotal === null ? 'N/v' : `${cat.meanGapAnnualTotal}%`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>

          <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm print-break-inside">
            <h3 className="text-md font-bold text-gray-900 mb-2">h) Geslachtsverdeling (Totaal en per Afdeling)</h3>
            <p className="text-xs text-gray-500 mb-6">
              Aantallen en percentages per geslacht, plus een overzicht per afdeling (percentages zijn binnen de afdeling).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-800 mb-2">Verdeling (Totaal)</div>
                <GenderPieChart data={genderPieData} />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-800 mb-3">Kerncijfers</div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-md border border-slate-200 p-3 bg-slate-50">
                    <div className="text-xs text-slate-500">Man</div>
                    <div className="text-lg font-bold text-slate-900">{report.maleCount}</div>
                    <div className="text-xs text-slate-600">{overallMalePercentage}%</div>
                  </div>
                  <div className="rounded-md border border-slate-200 p-3 bg-slate-50">
                    <div className="text-xs text-slate-500">Vrouw</div>
                    <div className="text-lg font-bold text-slate-900">{report.femaleCount}</div>
                    <div className="text-xs text-slate-600">{overallFemalePercentage}%</div>
                  </div>
                  <div className="rounded-md border border-slate-200 p-3 bg-slate-50">
                    <div className="text-xs text-slate-500">X</div>
                    <div className="text-lg font-bold text-slate-900">{report.otherCount}</div>
                    <div className="text-xs text-slate-600">{overallOtherPercentage}%</div>
                  </div>
                  <div className="rounded-md border border-slate-200 p-3 bg-slate-50">
                    <div className="text-xs text-slate-500">Afdelingen</div>
                    <div className="text-lg font-bold text-slate-900">{departmentTotal}</div>
                    <div className="text-xs text-slate-600">
                      Binair: {report.binaryCount} • Onbekend: {unknownDepartmentEmployees} • &lt;5: {smallDepartmentCount}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-600">
                  Afdelingen met kleine aantallen (&lt;5) kunnen gevoeliger zijn voor toeval en zijn minder geschikt voor harde conclusies.
                </div>
              </div>
            </div>

            <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="text-sm font-semibold text-gray-800">Overzicht per Afdeling</div>
                <div className="text-xs text-gray-500">Percentages zijn binnen de afdeling (totaal = 100%).</div>
              </div>
              <div className="max-h-96 overflow-auto print:max-h-none print:overflow-visible">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white sticky top-0 z-10 print:static">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Afdeling</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Totaal</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Man</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Vrouw</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">X</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {report.departmentGenderBreakdown.map((row, idx) => (
                      <tr key={row.department} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{row.department}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right font-medium text-gray-900">{row.totalEmployees}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-gray-700">
                          {row.maleCount} ({row.malePercentage}%)
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-gray-700">
                          {row.femaleCount} ({row.femalePercentage}%)
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-gray-700">
                          {row.otherCount} ({row.otherPercentage}%)
                        </td>
                      </tr>
                    ))}
                    {report.departmentGenderBreakdown.length === 0 && (
                      <tr>
                        <td className="px-4 py-3 text-gray-600" colSpan={5}>
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={`mt-8 text-center text-xs text-gray-400 ${isGeneratingPDF ? 'block' : 'no-print'}`}>
            <p>Gegenereerd door Monitor Loontransparantie. Data afkomstig uit Exact Online.</p>
          </div>

        </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
