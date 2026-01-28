import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { UploadDocument } from './pages/UploadDocument';
import { ResumeAnalysis } from './pages/ResumeAnalysis';
import About from './pages/About';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isDark ? 'dark bg-slate-950' : 'bg-slate-50'
      }`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main className="flex-1 pt-20 pb-12 w-full">
          <Routes>
            <Route
              path="/"
              element={<UploadDocument isDark={isDark} />}
            />
            <Route
              path="/analysis"
              element={
                <div className="animate-fade-in">
                  <ResumeAnalysis isDark={isDark} />
                  
                  {/* "Ready for another?" Section */}
                  <div className={`mt-12 text-center py-16 transition-colors duration-500 rounded-3xl mx-4 lg:mx-8 ${
                    isDark ? 'bg-slate-900/50' : 'bg-white/50'
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
                      <a
                        href="/"
                        className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus-ring ${
                          isDark
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/30 text-white'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-400/30 text-white'
                        }`}
                      >
                        ↻ Upload New Resume
                      </a>
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/about"
              element={<About isDark={isDark} />}
            />
          </Routes>
        </main>

        {/* Global JSX Styles for Animations */}
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
    </Router>
  );
}

export default App;