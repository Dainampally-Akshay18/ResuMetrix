import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader, MessageCircle, X } from 'lucide-react';
import { useChatbotStore } from '../store';

export function Chatbot({ isDark }) {
  const { messages, sendMessage, isLoading, error, clearMessages } = useChatbotStore();
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
        className="fixed bottom-4 right-4 lg:static p-3 sm:p-4 rounded-full shadow-2xl z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110 transition-transform"
        aria-label="Open resume assistant chatbot"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden flex flex-col border h-96 sm:h-[600px] ${
      isDark
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white/80 border-gray-300'
    }`}>
      
      {/* Header - Fixed */}
      <div className={`p-3 sm:p-4 md:p-5 border-b flex-shrink-0 ${
        isDark
          ? 'bg-gray-800/80 border-gray-700'
          : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <h2 className={`text-sm sm:text-base md:text-lg font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Resume Assistant
              </h2>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                AI-powered guidance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            aria-label="Close resume assistant chatbot"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Container - Fixed Height with Internal Scroll */}
      <div 
        ref={messagesContainerRef}
        className={`overflow-y-auto p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 md:space-y-4 flex flex-col flex-1 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}
        style={{
          scrollBehavior: 'smooth',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'scrollbar',
        }}
      >
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-6 sm:py-8">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 opacity-40">💬</div>
            <p className={`text-xs sm:text-sm md:text-base px-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ask questions about your resume
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm break-words ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.relevant === false && (
                    <p className={`text-xs mt-2 opacity-75 flex items-center space-x-1`}>
                      <AlertCircle size={12} />
                      <span>Resume questions only</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <Loader className="animate-spin" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error - Fixed */}
      {error && (
        <div className={`px-3 sm:px-4 py-2 text-xs flex items-center gap-2 border-t flex-shrink-0 ${
          isDark
            ? 'bg-red-900/20 text-red-400 border-red-700'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          <AlertCircle size={14} className="flex-shrink-0" />
          <span className="line-clamp-1">{error}</span>
        </div>
      )}

      {/* Input - Fixed */}
      <form onSubmit={handleSendMessage} className={`p-3 sm:p-4 border-t flex-shrink-0 ${
        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            aria-label="Message input"
            className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all ${
              isDark
                ? 'bg-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500'
                : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 border border-gray-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-2 sm:p-2.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex-shrink-0"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>

      {/* Clear Button - Fixed */}
      {messages.length > 0 && (
        <button
          onClick={clearMessages}
          className={`w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors border-t flex-shrink-0 ${
            isDark
              ? 'text-gray-400 border-gray-700 hover:bg-gray-700/50'
              : 'text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
          aria-label="Clear chat history"
        >
          Clear Chat
        </button>
      )}
    </div>
  );
}