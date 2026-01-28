import { useState, useEffect } from 'react';
import { Navbar } from './components';
import { UploadDocument } from './pages/UploadDocument';
import { ResumeAnalysis } from './pages/ResumeAnalysis';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [currentPage, setCurrentPage] = useState('upload');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleUploadSuccess = () => {
    setCurrentPage('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToUpload = () => {
    setCurrentPage('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'dark' : ''
    }`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      {currentPage === 'upload' ? (
        <UploadDocument isDark={isDark} onUploadSuccess={handleUploadSuccess} />
      ) : (
        <div>
          <ResumeAnalysis isDark={isDark} />
          <div className={`text-center py-16 transition-colors duration-500 ${
            isDark ? 'bg-slate-950' : 'bg-slate-50'
          }`}>
            <div className="max-w-md mx-auto px-4">
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Ready for another analysis?
              </h3>
              <p className={`mb-8 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Upload a new resume to get fresh insights and improve your chances.
              </p>
              <button
                onClick={handleBackToUpload}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus-ring ${
                  isDark
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/30 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-400/30 text-white'
                }`}
              >
                ↻ Upload New Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin-once {
          animation: spin-once 0.3s ease-out;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;