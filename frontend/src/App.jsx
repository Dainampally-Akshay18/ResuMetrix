import { useState } from 'react';
import { Navbar } from './components';
import { UploadDocument } from './pages/UploadDocument';
import { ResumeAnalysis } from './pages/ResumeAnalysis';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload'); // 'upload' or 'analysis'

  const handleUploadSuccess = () => {
    setCurrentPage('analysis');
  };

  const handleBackToUpload = () => {
    setCurrentPage('upload');
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      {currentPage === 'upload' ? (
        <UploadDocument isDark={isDark} onUploadSuccess={handleUploadSuccess} />
      ) : (
        <div>
          <ResumeAnalysis isDark={isDark} />
          <div className="text-center py-8">
            <button
              onClick={handleBackToUpload}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Upload New Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
