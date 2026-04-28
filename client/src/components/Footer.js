import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-police-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Anilao MPS</h3>
            <p className="text-xs text-gray-400 mb-4">Municipal Police Station</p>
            <p className="text-gray-400 text-sm">
              Serving and protecting the community of Anilao with integrity, professionalism, and dedication.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-police-accent">Contact Information</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Poblacion, Anilao, Iloilo, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>0998 598 6193</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>033 362 0405</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>Emergency: 911</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>anilao.pnp@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-police-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/directories" className="hover:text-white transition-colors">Directories</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/policies" className="hover:text-white transition-colors">Policies</a></li>
              <li><a href="/report" className="hover:text-white transition-colors">Report Crime</a></li>
              <li><a href="/news" className="hover:text-white transition-colors">News & Updates</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-police-blue mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Anilao Municipal Police Station. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
