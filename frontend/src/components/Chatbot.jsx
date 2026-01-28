import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader, MessageCircle, X, Bot, User, Sparkles } from 'lucide-react';
import { useChatbotStore } from '../store';

export function Chatbot({ isDark }) {
  const { messages, sendMessage, isLoading, error, clearMessages } = useChatbotStore();
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const message = inputMessage;
    setInputMessage('');

    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`fixed bottom-6 right-6 lg:static group p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus-ring ${
          isDark
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/50'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/50'
        }`}
      >
        <MessageCircle size={28} className="text-white" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 items-center justify-center text-xs font-bold text-white">
            AI
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className={`rounded-3xl shadow-2xl overflow-hidden flex flex-col glass-effect border transition-all duration-500 ${
      isDark ? 'glass-effect-dark' : 'glass-effect-light'
    }`} style={{ minHeight: '600px', maxHeight: '85vh' }}>
      
      {/* Header */}
      <div className={`p-6 border-b ${
        isDark
          ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-slate-800'
          : 'bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-white/50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className={`p-3 rounded-xl ${
                isDark
                  ? 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20'
                  : 'bg-gradient-to-br from-indigo-100 to-purple-100'
              }`}>
                <Bot size={22} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Resume Assistant
              </h2>
              <p className={`text-sm flex items-center space-x-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <Sparkles size={12} />
                <span>AI-powered guidance</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 focus-ring ${
              isDark
                ? 'hover:bg-slate-800/50'
                : 'hover:bg-white/50'
            }`}
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${
        isDark ? 'bg-slate-900/20' : 'bg-white/30'
      }`}>
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className={`text-6xl mb-6 opacity-50 animate-float`}>💬</div>
            <p className={`text-lg font-semibold mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Ask me anything about
            </p>
            <p className={`text-gradient-primary font-bold text-xl mb-6`}>
              your resume!
            </p>
            <div className="space-y-3 max-w-sm">
              {[
                'How can I improve my skills section?',
                'Is my resume ATS-friendly?',
                'Suggest better action verbs',
                'Review my work experience'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(suggestion)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? 'bg-slate-800/50 hover:bg-slate-800/80 text-slate-300'
                      : 'bg-white/60 hover:bg-white/80 text-slate-700'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-xs md:max-w-md px-5 py-4 rounded-2xl transition-all ${
                  message.role === 'user'
                    ? isDark
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : isDark
                    ? 'bg-slate-800/60 text-slate-100'
                    : 'bg-white/80 text-slate-900'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.role === 'user' ? (
                      <User size={14} className="opacity-70" />
                    ) : (
                      <Bot size={14} className="opacity-70" />
                    )}
                    <span className="text-xs font-semibold opacity-70">
                      {message.role === 'user' ? 'You' : 'ResuMetrix AI'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.relevant === false && (
                    <p className={`text-xs mt-3 pt-3 border-t ${
                      isDark ? 'border-slate-700 text-amber-300' : 'border-slate-300 text-amber-700'
                    } flex items-center space-x-1`}>
                      <AlertCircle size={12} />
                      <span>Please ask resume-related questions only</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-5 py-4 rounded-2xl ${
                  isDark ? 'bg-slate-800/60' : 'bg-white/80'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent"></div>
                    <div>
                      <p className="text-sm font-medium">Analyzing your question...</p>
                      <p className="text-xs opacity-70 mt-1">AI is thinking</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={`px-5 py-4 text-sm flex items-center space-x-3 border-t ${
          isDark
            ? 'bg-red-900/20 text-red-300 border-red-700/30'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          <AlertCircle size={18} className="flex-shrink-0" />
          <span className="line-clamp-1">{error}</span>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className={`p-6 border-t ${
        isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/40 border-white/50'
      }`}>
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question about your resume..."
              disabled={isLoading}
              className={`w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus-ring ${
                isDark
                  ? 'bg-slate-800/60 text-white placeholder-slate-500 focus:bg-slate-800/80 focus:ring-indigo-500'
                  : 'bg-white/60 text-slate-900 placeholder-slate-500 focus:bg-white focus:ring-indigo-500'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs px-2 py-1 rounded ${
              isDark ? 'bg-slate-800 text-slate-400' : 'bg-white/50 text-slate-500'
            }`}>
              AI
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`p-3.5 rounded-xl transition-all duration-300 focus-ring ${
              isLoading || !inputMessage.trim()
                ? isDark
                  ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                  : 'bg-white/50 text-slate-400 cursor-not-allowed'
                : `bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 active:scale-95 ${
                    isDark
                      ? 'hover:shadow-lg hover:shadow-indigo-500/30'
                      : 'hover:shadow-lg hover:shadow-indigo-400/30'
                  }`
            }`}
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>

      {/* Clear History Button */}
      {messages.length > 0 && (
        <button
          onClick={clearMessages}
          className={`w-full py-3 text-sm font-medium transition-all duration-300 border-t ${
            isDark
              ? 'text-slate-400 border-slate-800 hover:bg-slate-800/50'
              : 'text-slate-600 border-white/50 hover:bg-white/50'
          }`}
        >
          Clear Chat History
        </button>
      )}
    </div>
  );
}