import { useState } from 'react';
import { Sun, Moon, Menu, X, Zap, ChevronDown } from 'lucide-react';

export function Navbar({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 glass-effect ${
      isDark ? 'glass-effect-dark' : 'glass-effect-light'
    } border-b transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo with Animation */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 ${
              isDark 
                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20' 
                : 'bg-gradient-to-br from-indigo-100 to-purple-100'
            }`}>
              <div className={`absolute inset-0 rounded-xl animate-pulse-ring ${
                isDark 
                  ? 'bg-gradient-to-br from-indigo-500/30 to-purple-600/30' 
                  : 'bg-gradient-to-br from-indigo-300/30 to-purple-300/30'
              }`} />
              <Zap size={24} className="relative z-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-black text-gradient-primary">
                ResuMetrix
              </h1>
              <p className={`text-xs font-medium transition-colors ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                AI Resume Analyzer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Home
            </a>
            <a
              href="#"
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Features
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-1 ${
                  isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                }`}
                aria-label="Toggle resources menu"
              >
                <span>Resources</span>
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl glass-effect animate-fade-in z-50 ${
                  isDark ? 'glass-effect-dark' : 'glass-effect-light'
                }`}>
                  <a href="#" className={`block px-4 py-3 text-sm sm:text-base hover:bg-indigo-500/10 transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Blog
                  </a>
                  <a href="#" className={`block px-4 py-3 text-sm sm:text-base hover:bg-indigo-500/10 transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Documentation
                  </a>
                  <a href="#" className={`block px-4 py-3 text-sm sm:text-base hover:bg-indigo-500/10 transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    API
                  </a>
                </div>
              )}
            </div>
            <a
              href="#"
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Pricing
            </a>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 focus-ring ${
                isDark
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 hover:shadow-lg hover:shadow-amber-500/20'
                  : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 hover:shadow-lg hover:shadow-slate-500/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun size={20} className="animate-spin-once" />
              ) : (
                <Moon size={20} className="animate-spin-once" />
              )}
            </button>

            {/* CTA Button */}
            <button className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 focus-ring ${
              isDark
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25'
            }}`}
              aria-label="Get started with resume analysis"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 sm:p-2.5 rounded-xl transition-all duration-300 focus-ring ${
                isDark
                  ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  : 'bg-white/50 text-slate-700 hover:bg-white/80'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 animate-fade-in ${
            isDark ? 'border-t border-slate-800' : 'border-t border-slate-200'
          }`}>
            <div className="space-y-1">
              {['Home', 'Features', 'Resources', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`block px-4 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                    isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}