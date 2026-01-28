import { useState } from 'react';
import { Sun, Moon, Menu, X, Zap } from 'lucide-react';

export function Navbar({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringTheme, setIsHoveringTheme] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-slate-900/95 backdrop-blur-xl' : 'bg-gradient-to-r from-blue-50 via-white to-blue-50/30 backdrop-blur-xl'} border-b ${isDark ? 'border-slate-800/50' : 'border-blue-100/50'} transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Enhanced Logo with Glow Effect */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <div className={`relative p-3 rounded-2xl transition-all duration-500 ${isHoveringLogo ? 'scale-110' : 'scale-100'} ${
              isDark 
                ? 'bg-gradient-to-br from-indigo-500/20 via-purple-600/20 to-pink-500/20 shadow-lg shadow-purple-500/10' 
                : 'bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-500/10'
            }`}>
              {/* Animated gradient border */}
              
              {/* Icon with gradient */}
              <div className={`relative z-10 ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800'}`}>
                <img 
                  src="https://res.cloudinary.com/dunrzq7tv/image/upload/v1769594372/logo1_b7btnr.jpg" 
                  alt="ResuMetrix Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-900'}`}>
                ResuMetrix
                <span className={`ml-2 text-xs font-normal px-2 py-0.5 rounded-full ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-blue-500/20 text-blue-700'}`}>
                  PRO
                </span>
              </h1>
              <p className={`text-xs font-medium tracking-wide transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-blue-600/80'}`}>
                AI-Powered Resume Intelligence
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'About Developer', href: '/about' }
            ].map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-500 overflow-hidden group ${
                  isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-blue-900 hover:text-blue-950'
                }`}
              >
                {/* Background slide effect */}
                <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10' 
                    : 'bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-300/10'
                }`} />
                
                {/* Border animation */}
                <div className={`absolute inset-0 rounded-xl border ${
                  isDark 
                    ? 'border-slate-700/50 group-hover:border-indigo-500/30' 
                    : 'border-blue-200/50 group-hover:border-blue-400/50'
                } transition-colors duration-500`} />
                
                {/* Glow effect on hover */}
                <div className={`absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                  isDark ? 'bg-indigo-500' : 'bg-blue-400'
                }`} />
                
                <span className="relative z-10 flex items-center gap-2">
                  {item.label}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 ${isDark ? 'text-indigo-400' : 'text-blue-500'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          {/* Enhanced Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Premium Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              onMouseEnter={() => setIsHoveringTheme(true)}
              onMouseLeave={() => setIsHoveringTheme(false)}
              className={`relative p-3 rounded-xl transition-all duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'focus:ring-indigo-500 bg-gradient-to-br from-slate-800/50 to-slate-900/50'
                  : 'focus:ring-blue-500 bg-gradient-to-br from-white to-blue-50/50'
              } shadow-lg hover:shadow-xl ${isHoveringTheme ? 'scale-110' : 'scale-100'}`}
              aria-label="Toggle dark mode"
            >
              {/* Animated background */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                isDark
                  ? 'from-amber-500/10 via-orange-500/10 to-yellow-500/10'
                  : 'from-blue-500/5 via-sky-500/5 to-cyan-500/5'
              } transition-all duration-700 ${isHoveringTheme ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Rotating border */}
              <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${
                isDark
                  ? 'from-amber-400 via-orange-400 to-yellow-400'
                  : 'from-blue-400 via-sky-400 to-cyan-400'
              } opacity-0 ${isHoveringTheme ? 'animate-spin-slow opacity-30' : ''}`} />
              
              {/* Icon container */}
              <div className={`relative z-10 p-1.5 rounded-lg ${
                isDark
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
                  : 'bg-gradient-to-br from-blue-500/20 to-sky-500/20'
              }`}>
                {isDark ? (
                  <Sun size={22} className={`text-amber-300 ${isHoveringTheme ? 'animate-pulse' : ''}`} />
                ) : (
                  <Moon size={22} className={`text-blue-700 ${isHoveringTheme ? 'animate-pulse' : ''}`} />
                )}
              </div>
              
              {/* Tooltip effect */}
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 transition-opacity duration-300 ${isHoveringTheme ? 'opacity-100' : ''} ${
                isDark
                  ? 'bg-slate-800 text-amber-300'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </div>
            </button>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-3 rounded-xl transition-all duration-500 focus:outline-none focus:ring-2 ${
                isDark
                  ? 'focus:ring-indigo-500 bg-gradient-to-br from-slate-800/50 to-slate-900/50 text-slate-300 hover:text-white'
                  : 'focus:ring-blue-500 bg-gradient-to-br from-white to-blue-50/50 text-blue-900 hover:text-blue-950'
              } shadow-lg hover:shadow-xl`}
              aria-label="Toggle navigation menu"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X size={26} className="transition-transform duration-500 rotate-90" />
                ) : (
                  <Menu size={26} className="transition-transform duration-500" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 animate-fade-in-up ${isDark ? 'border-t border-slate-800/50' : 'border-t border-blue-200/50'}`}>
            <div className="space-y-2">
              {[
                { label: 'Home', href: '/', icon: '🏠' },
                { label: 'About Developer', href: '/about', icon: '👨‍💻' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative block px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-500 overflow-hidden group ${
                    isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-blue-900 hover:text-blue-950'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
                    isDark 
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' 
                      : 'bg-gradient-to-r from-blue-500/10 to-blue-300/10'
                  }`} />
                  
                  {/* Border */}
                  <div className={`absolute inset-0 rounded-2xl border ${
                    isDark 
                      ? 'border-slate-700/30 group-hover:border-indigo-500/30' 
                      : 'border-blue-200/30 group-hover:border-blue-400/30'
                  } transition-colors duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-4">
                    <span className={`text-xl transition-transform duration-500 group-hover:scale-125 ${
                      isDark ? 'text-indigo-400' : 'text-blue-500'
                    }`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    <svg 
                      className={`w-5 h-5 ml-auto transition-transform duration-500 group-hover:translate-x-2 ${isDark ? 'text-indigo-400' : 'text-blue-500'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Mobile menu footer */}
            <div className={`mt-6 pt-4 ${isDark ? 'border-t border-slate-800/50' : 'border-t border-blue-200/50'}`}>
              <p className={`text-sm text-center font-medium ${isDark ? 'text-slate-500' : 'text-blue-600/70'}`}>
                AI-Powered Resume Analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}