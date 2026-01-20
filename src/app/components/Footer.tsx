import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C62828] to-[#8E24AA] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LT</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Loontransparantie</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Uw gids voor transparantie in beloning en compliance met EU-wetgeving. Wij helpen organisaties bij de transitie naar eerlijke beloning.
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-bold text-lg mb-6">Informatie</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Over loontransparantie</a></li>
              <li><a href="#" className="hover:text-white transition-colors">EU-richtlijn 2026</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rapportageplicht</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nieuws & Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Checklists</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contactformulier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Klantenservice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner worden</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Werken bij ons</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © 2026 Loontransparantie. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy statement</a>
              <a href="#" className="hover:text-white transition-colors">Cookie statement</a>
              <a href="#" className="hover:text-white transition-colors">Voorwaarden</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
