import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader } from 'lucide-react';
import { useChatbotStore } from '../store';

export function Chatbot({ isDark }) {
  const { messages, sendMessage, isLoading, error } = useChatbotStore();
  const [inputMessage, setInputMessage] = useState('');
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

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden flex flex-col h-full ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`} style={{ minHeight: '600px' }}>
      
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Resume Assistant
        </h2>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Ask questions about your resume
        </p>
      </div>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className={`text-4xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
              💬
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Start a conversation about your resume
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
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? isDark
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm break-words">
                    {message.content}
                  </p>
                  {message.relevant === false && (
                    <p className={`text-xs mt-2 flex items-center ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <AlertCircle size={12} className="mr-1" />
                      Resume-related questions only
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <Loader className="animate-spin" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={`px-4 py-2 text-xs flex items-center ${
          isDark
            ? 'bg-red-900 bg-opacity-20 text-red-400 border-t border-red-700'
            : 'bg-red-50 text-red-700 border-t border-red-200'
        }`}>
          <AlertCircle size={14} className="mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className={`p-4 border-t ${
        isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
      }`}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
              isDark
                ? 'bg-gray-600 text-white placeholder-gray-400 focus:bg-gray-500'
                : 'bg-white text-gray-900 placeholder-gray-500 focus:bg-gray-50 border border-gray-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
                : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
            }`}
          >
            {isLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}