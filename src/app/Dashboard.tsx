import React, { useState, useEffect, useRef } from 'react';
import { Printer, RefreshCw, PieChart, Download, Table as TableIcon, X, LogOut } from 'lucide-react';
import { analyzeData } from '../services/calculationService';
import { AnalysisReport, Employee } from '../types';
import MetricCard from '../components/MetricCard';
import { QuartileChart, CategoryGapChart } from '../components/Charts';
import IntroPage from '../components/IntroPage';
import DivisionSelector from '../components/DivisionSelector';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface DashboardProps {
  onAppLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAppLogout }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDataset, setShowDataset] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasDivision, setHasDivision] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/status', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      if (res.status === 401) {
        setIsAuthenticated(false);
        setHasDivision(false);
        return;
      }

      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
      setHasDivision(data.hasDivision);
      
      if (data.isAuthenticated && data.hasDivision) {
        fetchData();
      }
    } catch (err) {
      console.error("Auth check failed", err);
      setIsAuthenticated(false);
      setHasDivision(false);
    }
  };

  const handleDivisionSelected = (divisionCode: number) => {
    setHasDivision(true);
    fetchData();
  };

  const handleExactLogout = async () => {
    try {
      await fetch('/api/exact-logout', { method: 'POST' });
      setIsAuthenticated(false);
      setHasDivision(false);
    } catch (err) {
      console.error('Exact logout failed:', err);
    }
  };

  const handleLogout = async () => {
    // Optional: add logout endpoint on backend
    window.location.href = '/auth/login'; // Redirect to login forces new session
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/employees', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      if (res.status === 401) {
        setIsAuthenticated(false);
        setHasDivision(false);
        return;
      }
      
      if (!res.ok) throw new Error('Kon data niet ophalen');
      
      const data: Employee[] = await res.json();
      setEmployees(data);
      setReport(analyzeData(data));
    } catch (err) {
      console.error(err);
      setError('Er is een fout opgetreden bij het ophalen van de Exact Online data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    setIsGeneratingPDF(true);
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => element.classList.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Rapportage-Loontransparantie.pdf');
    } catch (error) {
      console.error('Fout bij genereren PDF:', error);
      alert('Er is een fout opgetreden bij het maken van de PDF.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getGapColor = (gap: number) => {
    if (gap > 5 || gap < -5) return 'text-red-600';
    return 'text-green-600';
  };

  if (isAuthenticated === null) return <div className="flex h-screen items-center justify-center">Authenticatie controleren...</div>;
  
  if (!isAuthenticated) return <IntroPage onLogout={onAppLogout} />;

  if (!hasDivision) return <DivisionSelector onDivisionSelected={handleDivisionSelected} onExactLogout={handleExactLogout} />;

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
            
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
              <button 
                onClick={() => setHasDivision(false)}
                disabled={isGeneratingPDF || loading}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Wissel Administratie</span>
                <span className="sm:hidden">Wissel</span>
              </button>

              <button 
                onClick={fetchData}
                disabled={isGeneratingPDF || loading}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isGeneratingPDF || loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Ververs Data</span>
                <span className="sm:hidden">Ververs</span>
              </button>

              <button 
                onClick={() => setShowDataset(true)}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <TableIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Toon Dataset</span>
                <span className="sm:hidden">Data</span>
              </button>
              
              <button 
                onClick={handlePrint}
                disabled={isGeneratingPDF}
                className="flex-1 md:flex-none inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 whitespace-nowrap"
              >
                <Printer className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Afdrukken</span>
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
                {isGeneratingPDF ? 'Genereren...' : 'PDF'}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print-p-0">
        
        {/* Printable Area Wrapper */}
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
      </main>
    </div>
  );
};

export default Dashboard;
