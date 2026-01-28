import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-purple-50'
    }`}>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className={`inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium ${
            isDark
              ? 'bg-gray-800/50 border-gray-700 text-gray-300'
              : 'bg-white/80 border-blue-200 text-gray-700'
          }`}>
            <Sparkles size={16} />
            <span>AI-Powered Analysis</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 md:mb-5 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Optimize Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume Today
            </span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Get your ATS score, AI-powered insights, and actionable feedback
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['✓ Fast', '✓ Accurate', '✓ AI-Powered'].map((feature, idx) => (
              <div key={idx} className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${
                isDark
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-white text-gray-700'
              }`}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Card */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 border-2 ${
            dragActive
              ? isDark
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-blue-500 bg-blue-50'
              : isDark
              ? 'border-gray-700 bg-gray-800/50'
              : 'border-gray-300 bg-white/80'
          }`}
        >
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 bg-gradient-to-br from-blue-500 to-purple-600`}>
              <Upload size={28} className="sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white" />
            </div>

            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Upload Your Resume
            </h2>
            <p className={`mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Drag and drop or click to browse
            </p>

            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleChange}
                className="hidden"
                disabled={isLoading}
                aria-label="Upload resume file"
              />
              <div className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl font-semibold text-center text-white transition-all text-xs sm:text-sm md:text-base ${
                isLoading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:shadow-lg'
              } bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700`}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin">⚙️</div>
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FileText size={18} />
                    <span>Choose Resume</span>
                  </span>
                )}
              </div>
            </label>

            <p className={`text-xs mt-3 sm:mt-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Supported: PDF, DOCX • Max 10MB • Instant processing
            </p>
          </div>
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className={`mt-4 sm:mt-6 md:mt-8 p-4 sm:p-5 md:p-6 rounded-xl border transition-all ${
            isDark
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white/80 border-gray-300'
          }`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <FileText size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
              </div>
              <div className="min-w-0">
                <p className={`font-semibold truncate text-xs sm:text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedFile.name}
                </p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={`mt-4 sm:mt-6 md:mt-8 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl border-l-4 flex items-start gap-3 sm:gap-4 ${
            isDark
              ? 'bg-red-900/20 border-l-red-500 border border-red-700'
              : 'bg-red-50 border-l-red-500 border border-red-200'
          }`}>
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className={`font-semibold text-xs sm:text-sm md:text-base ${isDark ? 'text-red-400' : 'text-red-800'}`}>
                Error
              </p>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Success */}
        {resume && !error && (
          <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl border-l-4 flex items-start space-x-3 sm:space-x-4 ${
            isDark
              ? 'bg-green-900/20 border-l-green-500 border border-green-700'
              : 'bg-green-50 border-l-green-500 border border-green-200'
          }`}>
            <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm sm:text-base ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                ✓ Resume uploaded successfully!
              </p>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                Name: {resume.name}
              </p>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                Skills: {resume.skills?.length || 0}
              </p>
              <button
                onClick={() => onUploadSuccess()}
                className={`mt-4 px-6 py-2 rounded-lg font-medium inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white transition-all text-sm sm:text-base`}
              >
                <span>View Analysis</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}