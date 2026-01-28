import { useEffect, useState } from 'react';
import { useScoringStore, useAnalysisStore } from '../store';
import { Chatbot } from '../components/Chatbot';
import { TrendingUp, AlertCircle, CheckCircle, Loader, Target, Lightbulb, Zap } from 'lucide-react';

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

  const getScoreColor = (score) => {
    if (score >= 75) return 'from-green-500 to-emerald-600';
    if (score >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 75) return isDark ? 'bg-green-900/20' : 'bg-green-50';
    if (score >= 50) return isDark ? 'bg-yellow-900/20' : 'bg-yellow-50';
    return isDark ? 'bg-red-900/20' : 'bg-red-50';
  };

  const getScoreBorderColor = (score) => {
    if (score >= 75) return isDark ? 'border-green-700' : 'border-green-300';
    if (score >= 50) return isDark ? 'border-yellow-700' : 'border-yellow-300';
    return isDark ? 'border-red-700' : 'border-red-300';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 rounded-full backdrop-blur-md border ${
            isDark
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white/50 border-white/80'
          }">
            <Zap size={16} />
            <span className="text-sm font-medium">Analysis Complete</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Resume Analysis
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Detailed insights and actionable recommendations to improve your ATS score
          </p>
        </div>

        {/* Main Grid Layout: 70% Analysis, 30% Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8">
          
          {/* Analysis Section (70%) */}
          <div className="lg:col-span-7 space-y-6">
            
            {isLoading ? (
              <div className={`p-12 rounded-2xl text-center backdrop-blur-md border ${
                isDark
                  ? 'bg-gray-800/40 border-gray-700'
                  : 'bg-white/60 border-white/80'
              }`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                  <Loader className="animate-spin text-white" size={32} />
                </div>
                <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Analyzing your resume...
                </p>
              </div>
            ) : scores ? (
              <>
                
                {/* ATS Score Card */}
                <div className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700'
                    : 'bg-gradient-to-br from-white/80 to-white/40 border-white/80'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10" />
                  
                  <div className="relative p-8 md:p-12">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          YOUR ATS SCORE
                        </p>
                        <div className="flex items-baseline space-x-2">
                          <h2 className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${getScoreColor(scores.ats_score)} bg-clip-text text-transparent`}>
                            {scores.ats_score}
                          </h2>
                          <span className={`text-3xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            /100
                          </span>
                        </div>
                        <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {scores.ats_score >= 75 ? '✓ Excellent - Ready to submit' : 
                           scores.ats_score >= 50 ? '→ Good - Room for improvement' : 
                           '⚠ Needs work - See suggestions below'}
                        </p>
                      </div>
                      
                      <div className={`relative w-32 h-32 rounded-2xl ${getScoreBgColor(scores.ats_score)} border-2 ${getScoreBorderColor(scores.ats_score)} flex items-center justify-center`}>
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getScoreColor(scores.ats_score)} opacity-20`} />
                        <div className="relative text-center">
                          <TrendingUp className={`mx-auto mb-2 ${
                            scores.ats_score >= 75 ? 'text-green-500' :
                            scores.ats_score >= 50 ? 'text-yellow-500' :
                            'text-red-500'
                          }`} size={32} />
                          <p className={`text-xl font-bold ${
                            scores.ats_score >= 75 ? isDark ? 'text-green-400' : 'text-green-700' :
                            scores.ats_score >= 50 ? isDark ? 'text-yellow-400' : 'text-yellow-700' :
                            isDark ? 'text-red-400' : 'text-red-700'
                          }`}>
                            {scores.ats_score}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Scores Grid */}
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Section Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Object.entries(scores.section_scores || {}).map(([section, score]) => (
                      <div
                        key={section}
                        className={`p-4 rounded-xl backdrop-blur-md border transition-all hover:shadow-lg ${
                          isDark
                            ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800/60'
                            : 'bg-white/60 border-white/80 hover:bg-white/80'
                        }`}
                      >
                        <p className={`text-xs font-semibold uppercase mb-3 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {section}
                        </p>
                        <div className={`text-2xl font-black mb-2 ${
                          score >= 75 ? (isDark ? 'text-green-400' : 'text-green-600') :
                          score >= 50 ? (isDark ? 'text-yellow-400' : 'text-yellow-600') :
                          (isDark ? 'text-red-400' : 'text-red-600')
                        }`}>
                          {score}
                        </div>
                        <div className={`h-1.5 rounded-full overflow-hidden ${
                          isDark ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`h-full transition-all duration-500 ${
                              score >= 75 ? 'bg-green-500' :
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

                {/* Weaknesses Alert */}
                {scores.weaknesses?.length > 0 && (
                  <div className={`p-6 md:p-8 rounded-2xl backdrop-blur-md border-l-4 transition-all ${
                    isDark
                      ? 'bg-red-900/20 border-l-red-500 border-gray-700'
                      : 'bg-red-50/80 border-l-red-500 border-red-200'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <AlertCircle className={`flex-shrink-0 mt-1 ${
                        isDark ? 'text-red-400' : 'text-red-600'
                      }`} size={24} />
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-3 ${
                          isDark ? 'text-red-400' : 'text-red-800'
                        }`}>
                          Areas to Improve
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {scores.weaknesses.map((weakness, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${
                              isDark ? 'bg-red-900/30' : 'bg-red-100'
                            }`}>
                              <p className={`font-semibold capitalize ${
                                isDark ? 'text-red-300' : 'text-red-700'
                              }`}>
                                {weakness.section}
                              </p>
                              <p className={`text-sm ${
                                isDark ? 'text-red-200' : 'text-red-600'
                              }`}>
                                Score: {weakness.score}/100 • {weakness.severity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Feedback */}
                {analysis?.feedback && (
                  <div className={`p-8 rounded-2xl backdrop-blur-md border ${
                    isDark
                      ? 'bg-gray-800/40 border-gray-700'
                      : 'bg-white/60 border-white/80'
                  }`}>
                    <h3 className={`text-2xl font-bold mb-6 flex items-center space-x-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Lightbulb size={24} className="text-yellow-500" />
                      <span>AI Insights</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <p className={`text-sm font-semibold mb-2 uppercase ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Overall Assessment
                        </p>
                        <p className={`text-lg leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {analysis.feedback.overall_critique}
                        </p>
                      </div>

                      <div>
                        <p className={`text-sm font-semibold mb-3 uppercase flex items-center space-x-2 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}>
                          <CheckCircle size={16} />
                          <span>Your Strengths</span>
                        </p>
                        <ul className="space-y-2">
                          {analysis.feedback.strengths?.map((strength, idx) => (
                            <li key={idx} className={`flex items-start space-x-3 ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              <span className={`text-lg font-bold mt-0.5 ${
                                isDark ? 'text-green-400' : 'text-green-600'
                              }`}>
                                ✓
                              </span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`p-4 rounded-lg ${
                        isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                      }`}>
                        <p className={`text-sm font-semibold mb-2 uppercase ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Why This Score?
                        </p>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {analysis.feedback.score_reasoning}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section Improvements */}
                {analysis?.section_improvements && (
                  <div className={`p-8 rounded-2xl backdrop-blur-md border ${
                    isDark
                      ? 'bg-gray-800/40 border-gray-700'
                      : 'bg-white/60 border-white/80'
                  }`}>
                    <h3 className={`text-2xl font-bold mb-6 flex items-center space-x-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Target size={24} className="text-blue-500" />
                      <span>Improvement Suggestions</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.section_improvements.map((improvement, idx) => (
                        <div
                          key={idx}
                          className={`p-6 rounded-xl border-l-4 border-l-blue-500 ${
                            isDark
                              ? 'bg-gray-700/50'
                              : 'bg-blue-50'
                          }`}
                        >
                          <h4 className={`text-lg font-bold capitalize mb-3 ${
                            isDark ? 'text-blue-400' : 'text-blue-700'
                          }`}>
                            {improvement.section}
                          </h4>
                          <p className={`text-sm mb-4 ${
                            isDark ? 'text-gray-400' : 'text-gray-700'
                          }`}>
                            {improvement.current_quality}
                          </p>
                          <div className="space-y-2">
                            {improvement.suggestions?.map((suggestion, sidx) => (
                              <div key={sidx} className={`flex items-start space-x-3 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 ${
                                  isDark
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-500 text-white'
                                }`}>
                                  {sidx + 1}
                                </span>
                                <span className="text-sm">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={`p-12 rounded-2xl text-center backdrop-blur-md border ${
                isDark
                  ? 'bg-gray-800/40 border-gray-700'
                  : 'bg-white/60 border-white/80'
              }`}>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  No analysis available. Please upload a resume first.
                </p>
              </div>
            )}
          </div>

          {/* Chatbot Section (30%) - Sticky on larger screens */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <Chatbot isDark={isDark} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}