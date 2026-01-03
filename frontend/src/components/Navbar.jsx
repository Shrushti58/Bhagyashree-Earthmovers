// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Services', to: 'services' },
    { name: 'Equipment', to: 'equipment' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? theme === 'dark' 
              ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
              : 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link
              to="home"
              smooth={true}
              duration={800}
              offset={-80}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all"></div>
              </div>
              <div className={`transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <div className="font-bold text-xl tracking-tight leading-tight">BHAGYASHREE</div>
                <div className="text-xs tracking-widest font-light text-primary">EARTHMOVERS</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  spy={true}
                  activeClass="text-primary"
                  className={`relative font-medium text-sm transition-colors group cursor-pointer ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone Number */}
              <a 
                href="tel:+919876543210" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-white/5'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">+91 98765 43210</span>
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/10 text-white' 
                    : 'bg-gray-100 text-black'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className={`absolute top-20 right-0 left-0 mx-4 rounded-2xl overflow-hidden shadow-2xl animate-slide-down ${
            theme === 'dark' 
              ? 'bg-gray-900/95 backdrop-blur-xl border border-white/10' 
              : 'bg-white/95 backdrop-blur-xl border border-gray-200'
          }`}>
            <div className="p-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  spy={true}
                  onClick={() => setIsOpen(false)}
                  className={`block font-medium py-3 px-4 rounded-xl transition-all cursor-pointer ${
                    theme === 'dark' 
                      ? 'text-white hover:bg-white/5 hover:text-primary' 
                      : 'text-black hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-700/50 space-y-3">
                <a 
                  href="tel:+919876543210" 
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-white/5'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">+91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}