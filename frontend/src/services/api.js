import axios from 'axios';

const API_BASE_URL = ''


// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleError = (error) => {
  const message = error.response?.data?.detail || error.message || 'An error occurred';
  throw new Error(message);
};

// ==================== DOCUMENT ENDPOINTS ====================
export const documentAPI = {
  /**
   * Upload resume (PDF/DOCX)
   */
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post('/documents/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Get current resume from session
   */
  getCurrentResume: async () => {
    try {
      const response = await apiClient.get('/documents/current-resume');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// ==================== SCORING ENDPOINTS ====================
export const scoringAPI = {
  /**
   * Get ATS score for resume
   */
  getATSScore: async () => {
    try {
      const response = await apiClient.get('/scoring/score-resume');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Score resume with job description
   */
  scoreWithJD: async (jdText) => {
    try {
      const response = await apiClient.post('/scoring/score-with-jd', {
        jd_text: jdText,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// ==================== ANALYSIS ENDPOINTS ====================
export const analysisAPI = {
  /**
   * Get AI analysis of resume
   */
  analyzeResume: async () => {
    try {
      const response = await apiClient.get('/analysis/analyze-resume');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// ==================== CHATBOT ENDPOINTS ====================
export const chatbotAPI = {
  /**
   * Ask a question about resume
   */
  ask: async (message) => {
    try {
      const response = await apiClient.post('/chatbot/ask', {
        message,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Get conversation history
   */
  getHistory: async () => {
    try {
      const response = await apiClient.get('/chatbot/history');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Clear conversation history
   */
  clearHistory: async () => {
    try {
      const response = await apiClient.delete('/chatbot/clear-history');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Reset chatbot
   */
  reset: async () => {
    try {
      const response = await apiClient.post('/chatbot/reset');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default apiClient;
