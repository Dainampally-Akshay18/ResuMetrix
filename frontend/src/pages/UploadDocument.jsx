import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, ArrowRight, Sparkles, Cloud, Shield } from 'lucide-react';
import { useResumeStore } from '../store';

export function UploadDocument({ isDark, onUploadSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadResume, isLoading, error, resume } = useResumeStore();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      useResumeStore.setState({ error: 'Only PDF and DOCX files are supported' });
      return;
    }

    setSelectedFile(file);

    try {
      await uploadResume(file);
      setTimeout(() => {
        onUploadSuccess();
      }, 1500);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20 animate-float ${
          isDark ? 'bg-indigo-900/30' : 'bg-indigo-200/50'
        } -top-40 -left-40`} />
        <div className={`absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-float ${
          isDark ? 'bg-purple-900/30' : 'bg-purple-200/50'
        } -bottom-40 -right-40`} style={{ animationDelay: '1s' }} />
        <div className={`absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10 animate-float ${
          isDark ? 'bg-pink-900/20' : 'bg-pink-100/30'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className={`inline-flex items-center space-x-2 mb-6 px-4 py-2.5 rounded-full glass-effect transition-all duration-300 ${
            isDark ? 'glass-effect-dark' : 'glass-effect-light'
          }`}>
            <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-gradient-primary">
              AI-Powered Analysis
            </span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-black mb-6 transition-colors duration-300 animate-fade-in ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Optimize Your
            <span className="block text-gradient-primary mt-2 animate-gradient">
              Resume Today
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Get your ATS score, AI-powered insights, and actionable feedback to land your dream job
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: Sparkles, title: 'Fast', desc: 'Instant analysis in seconds' },
              { icon: Shield, title: 'Accurate', desc: '95% precision matching' },
              { icon: Cloud, title: 'Secure', desc: 'End-to-end encryption' }
            ].map((feature, idx) => (
              <div key={idx} className={`p-6 rounded-2xl glass-effect transition-all duration-300 hover:scale-105 ${
                isDark ? 'glass-effect-dark' : 'glass-effect-light'
              }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  isDark 
                    ? 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20' 
                    : 'bg-gradient-to-br from-indigo-100 to-purple-100'
                }`}>
                  <feature.icon size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Upload Card */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-3xl p-8 md:p-12 glass-effect transition-all duration-500 border-2 ${
            dragActive
              ? isDark
                ? 'border-indigo-500 shadow-2xl shadow-indigo-500/30'
                : 'border-indigo-500 shadow-2xl shadow-indigo-400/30'
              : isDark
              ? 'border-slate-800/50 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20'
              : 'border-white/50 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-300/20'
          }`}
        >
          
          {/* Upload Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 relative ${
              isDark
                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20'
                : 'bg-gradient-to-br from-indigo-100 to-purple-100'
            }`}>
              <div className={`absolute inset-0 rounded-3xl ${
                isDark
                  ? 'bg-gradient-to-br from-indigo-500/30 to-purple-600/30'
                  : 'bg-gradient-to-br from-indigo-300/30 to-purple-300/30'
              } animate-pulse-ring`} />
              <Upload size={48} className="relative z-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {dragActive ? '🎯 Drop to analyze!' : 'Upload Your Resume'}
            </h2>
            <p className={`text-lg mb-6 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {dragActive ? 'Release to upload instantly' : 'Drag & drop or click to browse'}
            </p>
          </div>

          {/* File Input */}
          <label className="block cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleChange}
              className="hidden"
              disabled={isLoading}
            />
            <div className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center group focus-ring ${
              isDark
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
              {isLoading ? (
                <span className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Processing your resume...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-3">
                  <FileText size={22} />
                  <span>Choose Resume</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </div>
          </label>

          {/* File Info */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <p className={`text-sm px-3 py-1.5 rounded-full ${
              isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-white/50 text-slate-600'
            }`}>
              📄 PDF & DOCX
            </p>
            <p className={`text-sm px-3 py-1.5 rounded-full ${
              isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-white/50 text-slate-600'
            }`}>
              ⚡ Instant Processing
            </p>
            <p className={`text-sm px-3 py-1.5 rounded-full ${
              isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-white/50 text-slate-600'
            }`}>
              🔒 Secure & Private
            </p>
          </div>
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className={`mt-8 p-6 rounded-2xl glass-effect border animate-fade-in transition-all duration-300 ${
            isDark ? 'glass-effect-dark' : 'glass-effect-light'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-slate-800/50' : 'bg-white/50'
              }`}>
                <FileText size={28} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-lg mb-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedFile.name}
                </p>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {(selectedFile.size / 1024).toFixed(2)} KB • Ready for analysis
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={`mt-8 p-6 rounded-2xl glass-effect border-l-4 flex items-start space-x-4 animate-fade-in transition-all duration-300 ${
            isDark
              ? 'bg-red-900/20 border-red-500'
              : 'bg-red-50/80 border-red-400'
          }`}>
            <AlertCircle size={28} className="text-red-500 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <p className={`font-bold text-lg mb-1 ${
                isDark ? 'text-red-400' : 'text-red-700'
              }`}>
                Upload Error
              </p>
              <p className={isDark ? 'text-red-300' : 'text-red-600'}>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {resume && !error && (
          <div className={`mt-8 p-8 rounded-2xl glass-effect border-l-4 animate-fade-in transition-all duration-300 ${
            isDark
              ? 'bg-emerald-900/20 border-emerald-500'
              : 'bg-emerald-50/80 border-emerald-400'
          }`}>
            <div className="flex items-start space-x-4">
              <CheckCircle size={32} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <p className={`font-bold text-xl mb-2 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  ✓ Resume uploaded successfully!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-emerald-900/30' : 'bg-emerald-100/50'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-emerald-300' : 'text-emerald-700'
                    }`}>
                      Document Name
                    </p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>
                      {resume.name}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-emerald-900/30' : 'bg-emerald-100/50'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-emerald-300' : 'text-emerald-700'
                    }`}>
                      Skills Detected
                    </p>
                    <p className="text-gradient-success font-bold">
                      {resume.skills?.length || 0} skills found
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onUploadSuccess()}
                  className={`px-8 py-3 rounded-xl font-semibold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 active:scale-95 focus-ring ${
                    isDark
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:shadow-emerald-500/25 text-white'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:shadow-emerald-400/25 text-white'
                  }`}
                >
                  <span>View Detailed Analysis</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}