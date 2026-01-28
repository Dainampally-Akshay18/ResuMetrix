import { create } from 'zustand';
import { scoringAPI } from '../services/api';

export const useScoringStore = create((set) => ({
  // State
  scores: null,
  jdMatch: null,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Get ATS score
   */
  getATSScore: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await scoringAPI.getATSScore();
      set({
        scores: response.scores,
        isLoading: false,
        error: null,
      });
      return response.scores;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Score with job description
   */
  scoreWithJD: async (jdText) => {
    set({ isLoading: true, error: null });
    try {
      const response = await scoringAPI.scoreWithJD(jdText);
      set({
        scores: response.scores,
        jdMatch: response.scores.jd_match,
        isLoading: false,
        error: null,
      });
      return response.scores;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Clear scores
   */
  clearScores: () => {
    set({
      scores: null,
      jdMatch: null,
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