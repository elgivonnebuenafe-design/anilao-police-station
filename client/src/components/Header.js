import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, FileText, AlertTriangle, Newspaper, Info, Camera, Eye } from 'lucide-react';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/services', label: 'Services', icon: FileText },
    { path: '/directories', label: 'Directories', icon: Users },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/media', label: 'Media', icon: Camera },
    { path: '/transparency', label: 'Transparency', icon: Eye },
    { path: '/policies', label: 'Policies', icon: FileText },
    { path: '/report', label: 'Report Crime', icon: AlertTriangle },
  ];

  return (
    <header className="bg-police-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/pnp-logo.png" alt="PNP Logo" className="w-10 h-10" />
            <div>
              <h1 className="font-bold text-lg leading-tight">Anilao MPS</h1>
              <p className="text-xs text-gray-300">Municipal Police Station</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-police-blue text-white' 
                      : 'text-gray-300 hover:bg-police-blue hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-police-dark border-t border-police-blue">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-police-blue text-white' 
                      : 'text-gray-300 hover:bg-police-blue hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
