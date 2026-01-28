import { create } from 'zustand';
import { analysisAPI } from '../services/api';

export const useAnalysisStore = create((set) => ({
  // State
  analysis: null,
  feedback: null,
  sectionImprovements: null,
  keywordSuggestions: null,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Get AI analysis
   */
  analyzeResume: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await analysisAPI.analyzeResume();
      const analysisData = response.analysis;

      set({
        analysis: analysisData,
        feedback: analysisData.feedback,
        sectionImprovements: analysisData.section_improvements,
        keywordSuggestions: analysisData.keyword_suggestions,
        isLoading: false,
        error: null,
      });
      return analysisData;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Clear analysis
   */
  clearAnalysis: () => {
    set({
      analysis: null,
      feedback: null,
      sectionImprovements: null,
      keywordSuggestions: null,
      error: null,
    });
  },

  /**
   * Set error
   */
  setError: (error) => {
    set({ error });
  },
}));