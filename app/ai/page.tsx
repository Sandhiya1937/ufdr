'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: 'Hello! I\'m your AI forensic assistant. I can help you analyze evidence, find patterns, and answer questions about your cases. What would you like to know?', timestamp: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message: string) => {
    const responses = [
      "Based on the evidence analysis, I've identified several key patterns in the communication data. The suspect shows unusual activity patterns between 2-4 AM.",
      "I've found 3 suspicious cryptocurrency transactions linked to this case. The amounts are $1,500, $3,200, and $8,900 respectively.",
      "Location data analysis reveals the device was at 3 different locations within a 2-hour window, which is statistically unusual.",
      "I've detected encrypted messaging apps that weren't previously identified. This could be significant evidence.",
      "The call logs show a pattern of calls to the same number every Tuesday and Thursday at 9 PM. This could be a scheduled contact.",
      "I've analyzed the browser history and found searches for 'money laundering techniques' and 'offshore accounts' on the same day as the suspicious transactions."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const quickQuestions = [
    "Show me Bitcoin transactions",
    "Find communication patterns",
    "Analyze location data",
    "Check for encrypted messages",
    "Look for suspicious activity"
  ]

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area">
          <div className="page-header">
            <h1 className="page-title">AI Assistant</h1>
            <p className="page-subtitle">Ask questions about your forensic data</p>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <div className="ai-avatar">🤖</div>
              <div className="ai-info">
                <h3>Forensic AI Assistant</h3>
                <p>Powered by advanced machine learning</p>
              </div>
              <div className="ai-status">
                <span className="status-dot online"></span>
                Online
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'ai' ? '🤖' : '👤'}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message ai">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="quick-questions">
              <h4>Quick Questions:</h4>
              <div className="question-buttons">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="question-btn"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your forensic data..."
                className="message-input"
              />
              <button
                onClick={handleSendMessage}
                className="send-btn"
                disabled={!inputMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>

          <div className="ai-insights">
            <h3>Recent AI Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-icon">🔍</div>
                <div className="insight-content">
                  <h4>Pattern Detection</h4>
                  <p>Unusual communication patterns detected in Case #2024-001</p>
                  <span className="confidence">92% confidence</span>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">💰</div>
                <div className="insight-content">
                  <h4>Crypto Analysis</h4>
                  <p>3 suspicious Bitcoin transactions identified</p>
                  <span className="confidence">87% confidence</span>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">📍</div>
                <div className="insight-content">
                  <h4>Location Correlation</h4>
                  <p>Multiple devices at same location detected</p>
                  <span className="confidence">95% confidence</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
