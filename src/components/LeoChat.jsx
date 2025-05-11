import React from 'react';
import { useState, useEffect } from 'react';
import { FiSend, FiX, FiMessageSquare } from 'react-icons/fi';

export default function LeoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your SoftSell assistant. Ask me about selling software licenses.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded responses for common questions
  const quickResponses = {
    "how do i sell": "Go to 'Sell My Licenses', upload your details, and get an instant valuation!",
    "payment time": "We process payments within 24 hours after license verification.",
    "supported licenses": "We accept Microsoft, Adobe, Autodesk, and Oracle licenses."
  };

  // Close chat with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Check quick responses first
    const lowerInput = input.toLowerCase();
    for (const [key, response] of Object.entries(quickResponses)) {
      if (lowerInput.includes(key)) {
        setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
        setIsLoading(false);
        return;
      }
    }

    // Call OpenAI API
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": ``,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You're an assistant for SoftSell (software license resale platform). Keep responses concise (1-2 sentences). Key info: Users can sell licenses in 3 steps: 1) Upload 2) Get valuation 3) Receive payment."
            },
            { role: "user", content: input }
          ],
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      setMessages(prev => [...prev, { 
        text: data.choices[0].message.content,
        sender: 'ai' 
      }]);
      
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble responding. Please try again later.", 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all ${
          isOpen ? 'hidden' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        aria-label="Open chat"
      >
        <FiMessageSquare size={24} />
      </button>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <h2 className="font-semibold text-lg">SoftSell Assistant</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Close chat"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[calc(100%-130px)] p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-100 ml-auto rounded-br-none'
                  : 'bg-gray-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="mb-3 max-w-[80%] p-3 rounded-lg bg-gray-100 rounded-bl-none w-20">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
              aria-label="Send message"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}