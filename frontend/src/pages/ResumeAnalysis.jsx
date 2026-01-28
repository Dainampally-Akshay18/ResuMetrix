import { useEffect, useState } from 'react';
import { useScoringStore, useAnalysisStore } from '../store';
import { Chatbot } from '../components/Chatbot';
import { RadialProgress } from '../components/RadialProgress';
import { TrendingUp, AlertCircle, CheckCircle, Loader, Target, Lightbulb, Zap } from 'lucide-react';

export function ResumeAnalysis({ isDark }) {
  const { scores, getATSScore, isLoading: scoringLoading } = useScoringStore();
  const { analysis, analyzeResume, isLoading: analysisLoading } = useAnalysisStore();
  const [showScrollLock, setShowScrollLock] = useState(false);

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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-purple-50'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Resume Analysis
          </h1>
          <p className={`text-sm sm:text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your detailed ATS score and AI-powered feedback
          </p>
        </div>

        {/* Grid: 70% Analysis, 30% Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6 md:gap-8">
          
          {/* Analysis (70%) - No overflow */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 md:space-y-6 overflow-visible">
            
            {isLoading ? (
              <div className={`p-8 sm:p-10 md:p-12 rounded-2xl text-center ${
                isDark
                  ? 'bg-gray-800/50 border border-gray-700'
                  : 'bg-white/80 border border-gray-300'
              }`}>
                <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Analyzing your resume...
                </p>
              </div>
            ) : scores ? (
              <>
                
                {/* ATS Score Card with Radial Progress */}
                <div className={`p-6 sm:p-8 md:p-12 rounded-2xl border ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700'
                    : 'bg-gradient-to-br from-white/80 to-white/50 border-gray-300'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                    <div>
                      <p className={`text-xs sm:text-sm font-semibold uppercase mb-3 sm:mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        ATS Score
                      </p>
                      <p className={`text-base sm:text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {scores.ats_score >= 75 ? '✓ Excellent - Ready to submit' : 
                         scores.ats_score >= 50 ? '→ Good - Room for improvement' : 
                         '⚠ Needs work - See suggestions below'}
                      </p>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your resume has strong ATS compatibility and is ready for submission to most job boards.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <RadialProgress 
                        score={scores.ats_score} 
                        maxScore={100}
                        label="ATS Score"
                        isDark={isDark}
                        size={140}
                      />
                    </div>
                  </div>
                </div>

                {/* Section Scores with Radial Progress */}
                <div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Section Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                    {Object.entries(scores.section_scores || {}).map(([section, score]) => (
                      <div
                        key={section}
                        className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all border ${
                          isDark
                            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                            : 'bg-white/80 border-gray-300 hover:bg-white'
                        }`}
                      >
                        <RadialProgress 
                          score={score} 
                          maxScore={100}
                          label={section.charAt(0).toUpperCase() + section.slice(1)}
                          isDark={isDark}
                          size={100}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                {scores.weaknesses?.length > 0 && (
                  <div className={`p-4 sm:p-6 md:p-8 rounded-2xl border-l-4 border-l-red-500 ${
                    isDark
                      ? 'bg-red-900/20 border border-red-700'
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                      isDark ? 'text-red-400' : 'text-red-800'
                    }`}>
                      <AlertCircle size={20} />
                      <span>Areas to Improve</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {scores.weaknesses.map((weakness, idx) => (
                        <div key={idx} className={`p-3 sm:p-4 rounded-lg ${
                          isDark ? 'bg-red-900/30' : 'bg-red-100'
                        }`}>
                          <p className={`text-sm sm:text-base font-semibold capitalize ${
                            isDark ? 'text-red-300' : 'text-red-700'
                          }`}>
                            {weakness.section}
                          </p>
                          <p className={`text-xs sm:text-sm ${
                            isDark ? 'text-red-200' : 'text-red-600'
                          }`}>
                            Score: {weakness.score}/100
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Feedback */}
                {analysis?.feedback && (
                  <div className={`p-6 sm:p-8 md:p-10 rounded-2xl border ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/80 border-gray-300'
                  }`}>
                    <h3 className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Lightbulb size={24} className="text-yellow-500" />
                      <span>AI Insights</span>
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      <div>
                        <p className={`text-xs sm:text-sm font-bold uppercase mb-2 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Overall Assessment
                        </p>
                        <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {analysis.feedback.overall_critique}
                        </p>
                      </div>

                      {analysis.feedback.strengths?.length > 0 && (
                        <div>
                          <p className={`text-xs sm:text-sm font-bold uppercase mb-2 flex items-center gap-1 ${
                            isDark ? 'text-green-400' : 'text-green-600'
                          }`}>
                            <CheckCircle size={16} />
                            <span>Strengths</span>
                          </p>
                          <ul className="space-y-1 sm:space-y-2">
                            {analysis.feedback.strengths.map((strength, idx) => (
                              <li key={idx} className={`text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                ✓ {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Improvements */}
                {analysis?.section_improvements && (
                  <div className={`p-6 sm:p-8 md:p-10 rounded-2xl border ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/80 border-gray-300'
                  }`}>
                    <h3 className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Target size={24} className="text-blue-500" />
                      <span>Improvement Suggestions</span>
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      {analysis.section_improvements.map((improvement, idx) => (
                        <div
                          key={idx}
                          className={`p-4 sm:p-5 md:p-6 rounded-xl border-l-4 border-l-blue-500 ${
                            isDark
                              ? 'bg-gray-700/30'
                              : 'bg-blue-50'
                          }`}
                        >
                          <h4 className={`text-base sm:text-lg font-bold capitalize mb-2 ${
                            isDark ? 'text-blue-400' : 'text-blue-700'
                          }`}>
                            {improvement.section}
                          </h4>
                          <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {improvement.current_quality}
                          </p>
                          <ul className="space-y-1 sm:space-y-2">
                            {improvement.suggestions?.map((suggestion, sidx) => (
                              <li key={sidx} className={`text-xs sm:text-sm flex items-start gap-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <span className="text-blue-600 font-bold flex-shrink-0">{sidx + 1}.</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={`p-8 sm:p-10 md:p-12 rounded-2xl text-center ${
                isDark
                  ? 'bg-gray-800/50 border border-gray-700'
                  : 'bg-white/80 border border-gray-300'
              }`}>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No analysis available yet
                </p>
              </div>
            )}
          </div>

          {/* Chatbot (30%) - Fixed height container */}
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