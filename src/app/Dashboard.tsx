import React, { useState, useEffect, useRef } from 'react';
import { Printer, RefreshCw, PieChart, Download, Table as TableIcon, X, LogOut, FileText, User, BarChart2, Search } from 'lucide-react';
import { analyzeData, calculateMean, calculateGap } from '../services/calculationService';
import { AnalysisReport, Employee, Gender } from '../types';
import MetricCard from '../components/MetricCard';
import { QuartileChart, CategoryGapChart } from '../components/Charts';
import IntroPage from '../components/IntroPage';
import DivisionSelector from '../components/DivisionSelector';
import EmployeeReport from '../components/EmployeeReport';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface DashboardProps {
  onAppLogout?: () => void;
}

type ViewMode = 'dashboard' | 'explanation' | 'employee_check';

const Dashboard: React.FC<DashboardProps> = ({ onAppLogout }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDataset, setShowDataset] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // App Auth
  const [isExactAuthenticated, setIsExactAuthenticated] = useState<boolean>(false); // Exact OAuth
  const [hasDivision, setHasDivision] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  
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

  // Authentication check and initial data fetch
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/status', {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const data = await response.json();
        
        setIsAuthenticated(data.isAppAuthorized);
        setIsExactAuthenticated(data.isAuthenticated); // renamed to avoid confusion
        setHasDivision(data.hasDivision);
        
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

  const handleDivisionSelected = () => {
    setHasDivision(true);
    fetchData();
  };

  const handleExactLogout = async () => {
    try {
      await fetch('/api/exact-logout', { 
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      setIsExactAuthenticated(false);
      setHasDivision(false);
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
    window.print();
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
        windowWidth: 1200
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

  if (isAuthenticated === null) return <div className="flex h-screen items-center justify-center">Authenticatie controleren...</div>;
  
  // Stap 1: Als de gebruiker niet is ingelogd in de applicatie (zou afgehandeld moeten zijn door App.tsx)
  if (!isAuthenticated) return <div className="flex h-screen items-center justify-center">Geen toegang tot de applicatie. Log opnieuw in.</div>;

  // Stap 2: Als de gebruiker wel in de app is, maar nog niet gekoppeld met Exact Online
  if (!isExactAuthenticated) return <IntroPage onLogout={onAppLogout} />;

  // Stap 3: Als de gebruiker is gekoppeld, maar nog geen administratie heeft gekozen
  if (!hasDivision) return <DivisionSelector onDivisionSelected={handleDivisionSelected} onExactLogout={handleExactLogout} />;

  // Stap 4: Data laden
  if (loading && !report) return <div className="flex h-screen items-center justify-center">Data ophalen uit Exact Online...</div>;

  if (error) return (
    <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded">Opnieuw proberen</button>
    </div>
  );

  if (!report) return <div className="flex h-screen items-center justify-center">Geen data beschikbaar.</div>;

  return (
    <div className="min-h-screen bg-slate-50 print-p-0">
      {/* Navbar */}
      <nav className={`bg-white border-b border-gray-200 sticky top-0 z-10 ${isGeneratingPDF ? 'hidden' : 'no-print'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-3 md:h-16 md:py-0">
            <div className="flex items-center mb-3 md:mb-0 w-full md:w-auto">
              <PieChart className="h-8 w-8 text-indigo-600 mr-2 flex-shrink-0" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Monitor Loontransparantie</h1>
                <p className="text-xs text-gray-500">Conform EU Richtlijn 2023/970</p>
              </div>
            </div>
            
            {/* View Switcher Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mx-4">
                <button
                    onClick={() => setViewMode('dashboard')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${viewMode === 'dashboard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Dashboard
                </button>
                <button
                    onClick={() => setViewMode('explanation')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${viewMode === 'explanation' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Uitleg Rapport
                </button>
                <button
                    onClick={() => setViewMode('employee_check')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${viewMode === 'employee_check' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <User className="w-4 h-4 mr-2" />
                    Medewerker Check
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
              <button 
                onClick={onAppLogout}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Uitloggen</span>
              </button>

              <button 
                onClick={() => setHasDivision(false)}
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
                className="flex-1 md:flex-none inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                {isGeneratingPDF ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                    <Download className="h-4 w-4 mr-2" />
                )}
                PDF
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
                         <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">FTE</th>
                         <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jaaruren</th>
                         <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Basisloon/u</th>
                         <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Variabel/u</th>
                         <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Totaal/u</th>
                         <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Bruto Jaarloon</th>
                      </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                      {employees.map((emp, idx) => (
                         <tr key={emp.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                            <td className="px-4 py-2 whitespace-nowrap font-mono text-xs">{emp.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{emp.fullName || '-'}</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${emp.gender === 'Man' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
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
                                    <span className={`text-xs px-2 py-1 rounded-full ${emp.gender === Gender.Male ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                        {emp.gender}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {searchedEmployee && employeeAnalysis && (
                    <div className={`border-2 rounded-xl p-6 ${searchedEmployee.gender === Gender.Female ? 'border-pink-200 bg-pink-50' : 'border-blue-200 bg-blue-50'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className={`text-xl font-bold ${searchedEmployee.gender === Gender.Female ? 'text-pink-800' : 'text-blue-800'}`}>
                                    {searchedEmployee.fullName || `Medewerker ${searchedEmployee.id}`}
                                </h3>
                                <p className="text-sm opacity-75">{searchedEmployee.jobCategory}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${searchedEmployee.gender === Gender.Female ? 'bg-pink-200 text-pink-800' : 'bg-blue-200 text-blue-800'}`}>
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
                                    <span className="font-medium text-gray-700">Loonkloof (Gehele Bedrijf)</span>
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
                                    <span className="font-medium text-gray-700">Loonkloof (Functieniveau)</span>
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
            <div ref={reportRef} className={`${isGeneratingPDF ? 'p-8 bg-white' : ''}`}>
                <EmployeeReport report={report} />
                <div className={`mt-8 text-center text-xs text-gray-400 ${isGeneratingPDF ? 'block' : 'no-print'}`}>
                    <p>Gegenereerd door Monitor Loontransparantie. Data afkomstig uit Exact Online.</p>
                </div>
            </div>
        )}

        {/* VIEW: DASHBOARD (Original) */}
        {viewMode === 'dashboard' && (
        <div ref={reportRef} className={`${isGeneratingPDF ? 'p-8 bg-white' : ''}`}>

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
                   <p className="text-xs text-gray-500">Populatie in deze analyse (M: {report.maleCount}, V: {report.femaleCount})</p>
                </div>
                <div className="text-2xl font-bold text-gray-900">{report.totalEmployees}</div>
             </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Rapportage Onderdelen</h2>

          {/* A t/m D Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print-break-inside">
            {/* a */}
            <MetricCard 
              title="a) Loonkloof (Gemiddeld)" 
              value={`${report.meanGapTotal}%`} 
              description="Verschil in gemiddeld totaal uurloon."
              valueClassName={getGapColor(report.meanGapTotal)}
              formula="(Gem. Loon Mannen - Gem. Loon Vrouwen) / Gem. Loon Mannen * 100"
            />
            {/* b */}
            <MetricCard 
              title="b) Kloof Variabel (Gemiddeld)" 
              value={`${report.meanGapVariable}%`} 
              description="Verschil in gemiddelde variabele componenten."
              valueClassName={getGapColor(report.meanGapVariable)}
              formula="(Gem. Variabel Mannen - Gem. Variabel Vrouwen) / Gem. Variabel Mannen * 100"
            />
            {/* c */}
            <MetricCard 
              title="c) Loonkloof (Mediaan)" 
              value={`${report.medianGapTotal}%`} 
              description="Verschil in mediaan totaal uurloon."
              valueClassName={getGapColor(report.medianGapTotal)}
              formula="(Mediaan Loon Mannen - Mediaan Loon Vrouwen) / Mediaan Loon Mannen * 100"
            />
            {/* d */}
            <MetricCard 
               title="d) Kloof Variabel (Mediaan)" 
               value={`${report.medianGapVariable}%`} 
               description="Verschil in mediane variabele componenten."
               valueClassName={getGapColor(report.medianGapVariable)}
               formula="(Mediaan Variabel Mannen - Mediaan Variabel Vrouwen) / Mediaan Variabel Mannen * 100"
            />
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
              <h3 className="text-md font-bold text-gray-900 mb-2">g) Loonkloof per Categorie</h3>
              <p className="text-xs text-gray-500 mb-6">Loonkloof uitgesplitst naar categorie, basisloon en variabele componenten.</p>
              
              <CategoryGapChart data={report.categoryGaps} />

              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase">Categorie</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Kloof Basisloon</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Kloof Variabel</th>
                      <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase">Kloof Totaal</th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
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
