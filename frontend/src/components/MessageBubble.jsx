import './MessageBubble.css'

function MessageBubble({ message }) {
  const { role, content, image, isLoading, isError } = message

  if (role === 'user') {
    return (
      <div className="message-wrapper user-message-wrapper">
        <div className="message-bubble user-bubble">
          <div className="message-content">
            {content}
          </div>
          {image && (
            <img 
              src={`data:${image.mimeType};base64,${image.data}`} 
              alt="Attached" 
              className="attached-image" 
            />
          )}
        </div>
        <div className="avatar user-avatar">
          <img src="/user.png" alt="User avatar" />
        </div>
      </div>
    )
  }

  return (
    <div className="message-wrapper ai-message-wrapper">
      <div className="avatar ai-avatar">
        <img src="/ai.png" alt="AI avatar" />
      </div>
      <div className={`message-bubble ai-bubble ${isError ? 'error-bubble' : ''}`}>
        {isLoading ? (
          <img src="/loading.webp" alt="Loading" className="loading-indicator" />
        ) : (
          <div 
            className="message-content"
            dangerouslySetInnerHTML={{ 
              __html: content.replace(/\n/g, '<br>') 
            }}
          />
        )}
      </div>
    </div>
  )
}

export default MessageBubble
