import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';

interface Division {
  Code: number;
  Description: string;
}

interface DivisionSelectorProps {
  onDivisionSelected: (divisionCode: number) => void;
  onExactLogout?: () => void;
}

const DivisionSelector: React.FC<DivisionSelectorProps> = ({ onDivisionSelected, onExactLogout }) => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    try {
      const res = await fetch('/api/divisions', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (!res.ok) throw new Error('Kon administraties niet ophalen');
      const data = await res.json();
      setDivisions(data);
    } catch (err) {
      console.error(err);
      setError('Fout bij het ophalen van administraties.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (code: number) => {
    try {
      const res = await fetch('/api/set-division', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ division: code })
      });
      if (res.ok) {
        onDivisionSelected(code);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Administraties ophalen...</div>;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 relative">
        {onExactLogout && (
          <button
            onClick={onExactLogout}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
            title="Uitloggen uit Exact Online"
          >
            <LogOut className="w-5 h-5" />
            <span>Uitloggen Exact Online</span>
          </button>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Selecteer Administratie</h2>
        
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((div) => (
            <button
              key={div.Code}
              onClick={() => handleSelect(div.Code)}
              className="w-full text-left px-6 py-5 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group flex flex-col justify-center"
            >
              <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-lg leading-tight mb-1">{div.Description}</div>
              <div className="text-sm text-gray-500">Administratiecode: {div.Code}</div>
            </button>
          ))}
        </div>

        {divisions.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500 py-8">Geen administraties gevonden.</p>
        )}
      </div>
    </div>
  );
};

export default DivisionSelector;
