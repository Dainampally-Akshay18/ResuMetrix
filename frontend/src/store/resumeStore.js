import { create } from 'zustand';
import { documentAPI } from '../services/api';

export const useResumeStore = create((set) => ({
  // State
  resume: null,
  fileName: null,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Upload and store resume
   */
  uploadResume: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const response = await documentAPI.uploadResume(file);
      set({
        resume: response.resume,
        fileName: file.name,
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Fetch current resume
   */
  fetchCurrentResume: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await documentAPI.getCurrentResume();
      set({
        resume: response,
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Clear resume from store
   */
  clearResume: () => {
    set({
      resume: null,
      fileName: null,
      error: null,
    });
  },

  /**
   * Set error
   */
  setError: (error) => {
    set({ error });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },
}));