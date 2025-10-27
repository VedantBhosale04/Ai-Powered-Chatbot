import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import './ChatContainer.css'

function ChatContainer({ messages }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <main 
      className="chat-container" 
      ref={containerRef}
      role="main" 
      aria-live="polite" 
      aria-label="Chat conversation"
    >
      {messages.length === 0 && (
        <div className="welcome-message">
          <div className="ai-avatar">
            <img src="/ai.png" alt="AI avatar" />
          </div>
          <p>Hello! How can I help you today?</p>
        </div>
      )}
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </main>
  )
}

export default ChatContainer
