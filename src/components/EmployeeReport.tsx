import React from 'react';
import { AnalysisReport } from '../types';

interface EmployeeReportProps {
  report: AnalysisReport;
}

const EmployeeReport: React.FC<EmployeeReportProps> = ({ report }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const getDiffText = (gap: number) => {
    if (gap === 0) return "is gelijk aan";
    if (gap > 0) return `${Math.abs(gap)}% hoger dan`;
    return `${Math.abs(gap)}% lager dan`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Toelichting op de Cijfers (Loontransparantie)</h2>
      <p className="mb-6 text-gray-600">
        In dit rapport leggen we uit wat de verschillen zijn in beloning tussen mannen en vrouwen binnen onze organisatie. 
        We kijken hierbij naar verschillende onderdelen, zoals het gemiddelde loon, bonussen en de verdeling over functies.
      </p>

      {/* A */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">A. Het verschil in gemiddelde beloning</h3>
        <p className="mb-2">
          We kijken eerst naar het <strong>gemiddelde uurloon</strong>. Dit is het totaal van alle lonen bij elkaar opgeteld, gedeeld door het aantal medewerkers.
        </p>
        <div className="bg-indigo-50 p-4 rounded-md">
          <ul className="list-disc list-inside mb-2">
            <li>Gemiddeld uurloon mannen: <strong>{formatCurrency(report.meanHourlyWageMen)}</strong></li>
            <li>Gemiddeld uurloon vrouwen: <strong>{formatCurrency(report.meanHourlyWageWomen)}</strong></li>
          </ul>
          <p className="font-medium">
            Het gemiddelde loon van mannen is {getDiffText(report.meanGapTotal)} dat van vrouwen.
            De loonkloof is hier <strong>{report.meanGapTotal}%</strong>.
          </p>
        </div>
      </section>

      {/* B */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">B. Het verschil in extra's (variabele beloning)</h3>
        <p className="mb-2">
          Hier kijken we naar extra vergoedingen zoals bonussen of toeslagen (bovenop het basisloon).
        </p>
        <div className="bg-indigo-50 p-4 rounded-md">
           <ul className="list-disc list-inside mb-2">
            <li>Gemiddeld extra per uur (mannen): <strong>{formatCurrency(report.meanVariableMen)}</strong></li>
            <li>Gemiddeld extra per uur (vrouwen): <strong>{formatCurrency(report.meanVariableWomen)}</strong></li>
          </ul>
          <p className="font-medium">
            Het verschil in variabele beloning is <strong>{report.meanGapVariable}%</strong>.
          </p>
        </div>
      </section>

      {/* C */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">C. Het verschil in de mediaan</h3>
        <p className="mb-2">
          De <strong>mediaan</strong> is de middelste waarde als je alle lonen van laag naar hoog op een rij zet. 
          Dit geeft vaak een beter beeld omdat extreem hoge of lage lonen minder invloed hebben.
        </p>
        <div className="bg-indigo-50 p-4 rounded-md">
          <ul className="list-disc list-inside mb-2">
            <li>Middelste uurloon mannen: <strong>{formatCurrency(report.medianHourlyWageMen)}</strong></li>
            <li>Middelste uurloon vrouwen: <strong>{formatCurrency(report.medianHourlyWageWomen)}</strong></li>
          </ul>
          <p className="font-medium">
            De loonkloof op basis van de mediaan is <strong>{report.medianGapTotal}%</strong>.
          </p>
        </div>
      </section>

      {/* D */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">D. Het verschil in de mediaan van extra's</h3>
        <p className="mb-2">
          Hetzelfde als punt C, maar dan alleen voor de variabele beloningen (bonussen/toeslagen).
        </p>
        <div className="bg-indigo-50 p-4 rounded-md">
          <p className="font-medium">
            Het verschil in de mediaan van de variabele beloning is <strong>{report.medianGapVariable}%</strong>.
          </p>
        </div>
      </section>

      {/* E */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">E. Wie krijgt er een variabele beloning?</h3>
        <p className="mb-2">
          Welk deel van de mannen en welk deel van de vrouwen ontvangt extra beloningen?
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-3 rounded text-center">
            <span className="block text-2xl font-bold text-blue-700">{report.percentReceivingVariableMale}%</span>
            <span className="text-sm text-blue-900">van de Mannen</span>
          </div>
          <div className="bg-pink-50 p-3 rounded text-center">
            <span className="block text-2xl font-bold text-pink-700">{report.percentReceivingVariableFemale}%</span>
            <span className="text-sm text-pink-900">van de Vrouwen</span>
          </div>
        </div>
      </section>

      {/* F */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">F. Verdeling van lonen (Kwartielen)</h3>
        <p className="mb-2">
          We hebben alle lonen van laag naar hoog gezet en in vier gelijke groepen (kwartielen) verdeeld. 
          Hieronder zie je de verdeling van mannen en vrouwen per groep.
        </p>
        <div className="space-y-2 mt-4">
          {report.quartiles.map((q) => (
            <div key={q.quartile} className="flex items-center">
              <div className="w-20 font-bold text-gray-700">{q.quartile}</div>
              <div className="flex-1 h-6 flex rounded overflow-hidden bg-gray-200">
                <div 
                  className="bg-blue-400 h-full flex items-center justify-center text-xs text-white" 
                  style={{ width: `${q.malePercentage}%` }}
                >
                  {q.malePercentage > 10 && `${q.malePercentage}% M`}
                </div>
                <div 
                  className="bg-pink-400 h-full flex items-center justify-center text-xs text-white" 
                  style={{ width: `${q.femalePercentage}%` }}
                >
                  {q.femalePercentage > 10 && `${q.femalePercentage}% V`}
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-1">Q1 = Laagste lonen ... Q4 = Hoogste lonen</p>
        </div>
      </section>

      {/* G */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">G. Verschillen per Functiegroep</h3>
        <p className="mb-2">
          Soms lijkt er een verschil te zijn, maar komt dit doordat mannen en vrouwen andere functies hebben. 
          Hieronder kijken we naar het verschil <em>binnen</em> dezelfde functiegroep.
        </p>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-2">Functiegroep</th>
                <th className="px-4 py-2">Verschil (Totaal)</th>
                <th className="px-4 py-2">Uitleg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {report.categoryGaps.map((cat) => (
                <tr key={cat.category}>
                  <td className="px-4 py-2">{cat.category}</td>
                  <td className={`px-4 py-2 font-bold ${cat.meanGapTotal && cat.meanGapTotal > 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {cat.meanGapTotal !== null ? `${cat.meanGapTotal}%` : 'N.v.t.'}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {cat.meanGapTotal === null 
                      ? "Niet genoeg data om te vergelijken." 
                      : cat.meanGapTotal > 0 
                        ? "Mannen verdienen gemiddeld meer in deze groep." 
                        : cat.meanGapTotal < 0 
                          ? "Vrouwen verdienen gemiddeld meer in deze groep."
                          : "Gelijk loon."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmployeeReport;
