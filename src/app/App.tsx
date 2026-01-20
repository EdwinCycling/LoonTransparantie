import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import InfoSection from '@/app/components/InfoSection';
import Timeline from '@/app/components/Timeline';
import QuotesSection from '@/app/components/QuotesSection';
import CTASection from '@/app/components/CTASection';
import Footer from '@/app/components/Footer';
import Dashboard from '@/app/Dashboard';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAppLogout = async () => {
    try {
      await fetch('/api/app-logout', { method: 'POST' });
      setIsAuthorized(false);
    } catch (err) {
      console.error('Logout failed:', err);
      // Fallback: even if API fails, clear local state
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    // Check status bij opstarten
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        if (data.isAppAuthorized) {
          setIsAuthorized(true);
        }
      })
      .catch(err => console.error('Status check mislukt:', err));

    // Check voor onthouden gebruikersnaam
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const openLoginModal = () => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    } else {
      setUsername('');
      setRememberMe(false);
    }
    setLoginError('');
    setIsLoginModalOpen(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/app-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        // Onthoud mij logica
        if (rememberMe) {
          localStorage.setItem('savedUsername', username);
        } else {
          localStorage.removeItem('savedUsername');
        }
        
        setIsAuthorized(true);
        setIsLoginModalOpen(false);
      } else {
        setLoginError(data.error || 'Ongeldige inloggegevens');
      }
    } catch (err) {
      setLoginError('Er is een fout opgetreden bij het inloggen');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthorized) {
    return <Dashboard onAppLogout={handleAppLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={openLoginModal} />
      
      <main>
        <Hero onOntdekMeerClick={openLoginModal} />
        <InfoSection />
        <Timeline />
        <QuotesSection />
        <CTASection onOntdekMeerClick={openLoginModal} />
      </main>

      <Footer />

      {/* Login Modal Popup */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#C62828] to-[#8E24AA] bg-clip-text text-transparent">
                    Login
                  </h2>
                  <button 
                    onClick={() => setIsLoginModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gebruikersnaam</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Wachtwoord</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 outline-none transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {loginError && (
                    <p className="text-red-600 text-sm font-medium">{loginError}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-[#C62828]" 
                      />
                      <span className="text-sm text-gray-600">Onthoud mij</span>
                    </label>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-[#C62828] to-[#8E24AA] text-white font-bold text-lg shadow-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? 'Inloggen...' : 'Inloggen'}
                  </Button>
                </form>
              </div>
              
              <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                  Beveiligde Toegang • Loontransparantie 2026
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
