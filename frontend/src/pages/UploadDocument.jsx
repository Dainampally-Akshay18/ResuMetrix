import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
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
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      useResumeStore.setState({ error: 'Please upload a PDF or DOCX file' });
      return;
    }

    setSelectedFile(file);

    try {
      await uploadResume(file);
      // Call success callback
      setTimeout(() => {
        onUploadSuccess();
      }, 1000);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Upload Your Resume
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Get your ATS score and AI-powered feedback
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
            dragActive
              ? isDark
                ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                : 'border-blue-500 bg-blue-50'
              : isDark
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-300 bg-white'
          }`}
        >
          <Upload size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          
          <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Drag and drop your resume here
          </p>
          
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            or
          </p>

          <label className="inline-block">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleChange}
              className="hidden"
              disabled={isLoading}
            />
            <span className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Uploading...' : 'Browse Files'}
            </span>
          </label>

          <p className={`text-sm mt-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Supported formats: PDF, DOCX (Max 10MB)
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mt-6 p-4 rounded-lg flex items-start space-x-3 ${
            isDark
              ? 'bg-red-900 bg-opacity-20 border border-red-700'
              : 'bg-red-50 border border-red-200'
          }`}>
            <AlertCircle className={`${isDark ? 'text-red-400' : 'text-red-600'} flex-shrink-0`} size={20} />
            <p className={isDark ? 'text-red-400' : 'text-red-700'}>
              {error}
            </p>
          </div>
        )}

        {/* Success Message */}
        {resume && !error && (
          <div className={`mt-6 p-4 rounded-lg flex items-start space-x-3 ${
            isDark
              ? 'bg-green-900 bg-opacity-20 border border-green-700'
              : 'bg-green-50 border border-green-200'
          }`}>
            <CheckCircle className={`${isDark ? 'text-green-400' : 'text-green-600'} flex-shrink-0`} size={20} />
            <div>
              <p className={`font-medium ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                Resume uploaded successfully!
              </p>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                Name: {resume.name}
              </p>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                Skills: {resume.skills?.length || 0} found
              </p>
            </div>
          </div>
        )}

        {/* File Info */}
        {selectedFile && (
          <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-medium">Selected file:</span> {selectedFile.name}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="font-medium">Size:</span> {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}