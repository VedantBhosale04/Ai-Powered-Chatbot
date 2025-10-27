import './Header.css'

function Header({ onNewChat }) {
  return (
    <header className="app-header" role="banner">
      <h1 className="app-title">AI Chatbot</h1>
      <button 
        className="new-chat-btn" 
        onClick={onNewChat}
        aria-label="Start a new chat" 
        title="New chat"
      >
        New
      </button>
    </header>
  )
}

export default Header
