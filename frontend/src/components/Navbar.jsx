import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export function Navbar({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResuMetrix
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`hover:text-blue-600 transition-colors duration-200 ${isDark ? 'hover:text-blue-400' : ''}`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`hover:text-blue-600 transition-colors duration-200 ${isDark ? 'hover:text-blue-400' : ''}`}
            >
              About
            </a>
          </div>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Toggle menu"
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
          <div className={`md:hidden pb-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <a
              href="/"
              className={`block py-2 px-4 rounded hover:${isDark ? 'bg-gray-800' : 'bg-gray-100'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className={`block py-2 px-4 rounded hover:${isDark ? 'bg-gray-800' : 'bg-gray-100'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}