import React from 'react';
import { ArrowRight, Lock, LogOut } from 'lucide-react';

interface IntroPageProps {
  onLogout?: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onLogout }) => {
  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Logout button top right */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
            title="Uitloggen uit applicatie"
          >
            <LogOut className="w-5 h-5" />
            <span>Uitloggen</span>
          </button>
        )}

        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Monitor Loontransparantie
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Welkom bij de Loontransparantie Monitor. Deze applicatie analyseert uw Exact Online data om inzicht te geven in de loonverschillen tussen mannen en vrouwen binnen uw organisatie, conform de EU-richtlijn 2023/970.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Veilig & Vertrouwd</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Directe koppeling met Exact Online
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Geen data opslag buiten uw sessie
              </li>
            </ul>
          </div>

          <button
            onClick={handleLogin}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center mx-auto gap-2 shadow-lg hover:shadow-xl"
          >
            Inloggen met Exact Online
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="mt-6 text-xs text-slate-400">
            Door in te loggen geeft u tijdelijk toegang tot uw Payroll administratie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
