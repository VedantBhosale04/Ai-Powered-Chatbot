import { useState, useEffect } from 'react'
import Header from './components/Header'
import ChatContainer from './components/ChatContainer'
import InputArea from './components/InputArea'
import { sendMessage } from './utils/api'

function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('CHAT_HISTORY')
      if (saved) {
        setMessages(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load history:', e)
    }
  }, [])

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('CHAT_HISTORY', JSON.stringify(messages))
      } catch (e) {
        console.error('Failed to save history:', e)
      }
    }
  }, [messages])

  const handleSend = async (text, imageData) => {
    if (!text.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      image: imageData
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Add loading message
    const loadingMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '',
      isLoading: true
    }
    setMessages(prev => [...prev, loadingMsg])

    try {
      const reply = await sendMessage(text, imageData)
      
      // Replace loading message with actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMsg.id 
            ? { ...msg, content: reply, isLoading: false }
            : msg
        )
      )
    } catch (error) {
      // Replace loading with error
      setMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMsg.id
            ? { 
                ...msg, 
                content: `Error: ${error.message}. Ensure the backend is running and GEMINI_API_KEY is set.`, 
                isLoading: false,
                isError: true 
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    try {
      localStorage.removeItem('CHAT_HISTORY')
    } catch (e) {
      console.error('Failed to clear history:', e)
    }
  }

  return (
    <>
      <Header onNewChat={handleNewChat} />
      <ChatContainer messages={messages} />
      <InputArea onSend={handleSend} disabled={isLoading} />
    </>
  )
}

export default App
