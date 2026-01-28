import { useEffect, useState } from 'react';
import { useScoringStore, useAnalysisStore } from '../store';
import { Chatbot } from '../components/Chatbot';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export function ResumeAnalysis({ isDark }) {
  const { scores, getATSScore, isLoading: scoringLoading } = useScoringStore();
  const { analysis, analyzeResume, isLoading: analysisLoading } = useAnalysisStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchScoresAndAnalysis = async () => {
      try {
        await getATSScore();
        await analyzeResume();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchScoresAndAnalysis();
  }, []);

  const isLoading = scoringLoading || analysisLoading;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Resume Analysis
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Your detailed ATS score and AI-powered feedback
          </p>
        </div>

        {/* Main Container: 70% Analysis, 30% Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 auto-rows-max">
          
          {/* Analysis Section (70%) */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className={`p-8 rounded-lg text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <Loader className="animate-spin mx-auto mb-4" size={40} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Analyzing your resume...
                </p>
              </div>
            ) : scores ? (
              <div className="space-y-6">
                
                {/* ATS Score Card */}
                <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ATS Score
                      </p>
                      <p className={`text-5xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {scores.ats_score}
                      </p>
                      <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        out of 100
                      </p>
                    </div>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-center ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <div>
                        <BarChart3 size={40} className={isDark ? 'text-blue-400 mx-auto' : 'text-blue-600 mx-auto'} />
                        <p className={`text-sm font-medium mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Score: {scores.ats_score}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Scores */}
                <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Section Scores
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(scores.section_scores || {}).map(([section, score]) => (
                      <div key={section}>
                        <div className="flex justify-between mb-2">
                          <span className={`capitalize font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {section}
                          </span>
                          <span className={`font-bold ${
                            score >= 70 ? (isDark ? 'text-green-400' : 'text-green-600') : 
                            score >= 50 ? (isDark ? 'text-yellow-400' : 'text-yellow-600') : 
                            (isDark ? 'text-red-400' : 'text-red-600')
                          }`}>
                            {score}/100
                          </span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              score >= 70 ? 'bg-green-500' : 
                              score >= 50 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                {scores.weaknesses?.length > 0 && (
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-red-900 bg-opacity-20 border border-red-700' : 'bg-red-50 border border-red-200'} shadow-lg`}>
                    <h2 className={`text-lg font-bold mb-4 flex items-center ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                      <AlertCircle size={20} className="mr-2" />
                      Areas to Improve
                    </h2>
                    <ul className="space-y-2">
                      {scores.weaknesses.map((weakness, idx) => (
                        <li key={idx} className={`text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                          • <span className="capitalize font-medium">{weakness.section}</span> - Score: {weakness.score}/100 ({weakness.severity})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* AI Feedback */}
                {analysis?.feedback && (
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AI Feedback
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className={`font-medium mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          Overall Assessment
                        </h3>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {analysis.feedback.overall_critique}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className={`font-medium mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                          Strengths
                        </h3>
                        <ul className="space-y-1">
                          {analysis.feedback.strengths?.map((strength, idx) => (
                            <li key={idx} className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              <CheckCircle size={16} className={`mr-2 flex-shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className={`font-medium mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          Score Reasoning
                        </h3>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {analysis.feedback.score_reasoning}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section Improvements */}
                {analysis?.section_improvements && (
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Improvement Suggestions
                    </h2>
                    <div className="space-y-6">
                      {analysis.section_improvements.map((improvement, idx) => (
                        <div key={idx} className={`p-4 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <h3 className={`font-bold capitalize mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            {improvement.section}
                          </h3>
                          <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {improvement.current_quality}
                          </p>
                          <ul className="space-y-2">
                            {improvement.suggestions?.map((suggestion, sidx) => (
                              <li key={sidx} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={`p-8 rounded-lg text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  No analysis available. Please upload a resume first.
                </p>
              </div>
            )}
          </div>

          {/* Chatbot Section (30%) */}
          <div className="lg:col-span-3">
            <Chatbot isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  );
}