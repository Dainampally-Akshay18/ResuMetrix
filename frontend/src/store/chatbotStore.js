import { create } from 'zustand';
import { chatbotAPI } from '../services/api';

export const useChatbotStore = create((set) => ({
  // State
  messages: [],
  isLoading: false,
  error: null,
  conversationLength: 0,

  // Actions
  /**
   * Send message and get response
   */
  sendMessage: async (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          role: 'user',
          content: message,
          timestamp: new Date(),
        },
      ],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await chatbotAPI.ask(message);

      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: response.message,
            timestamp: new Date(),
            relevant: response.relevant,
          },
        ],
        isLoading: false,
        conversationLength: response.conversation_length,
        error: null,
      }));

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
   * Get conversation history
   */
  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await chatbotAPI.getHistory();
      set({
        messages: response.history.map((msg, index) => ({
          id: index,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(),
        })),
        conversationLength: response.conversation_length,
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
   * Clear history
   */
  clearHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      await chatbotAPI.clearHistory();
      set({
        messages: [],
        conversationLength: 0,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Reset chatbot
   */
  reset: async () => {
    set({ isLoading: true, error: null });
    try {
      await chatbotAPI.reset();
      set({
        messages: [],
        conversationLength: 0,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Add local message (UI only)
   */
  addLocalMessage: (role, content) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          role,
          content,
          timestamp: new Date(),
        },
      ],
    }));
  },

  /**
   * Clear messages
   */
  clearMessages: () => {
    set({ messages: [], conversationLength: 0 });
  },

  /**
   * Set error
   */
  setError: (error) => {
    set({ error });
  },
}));