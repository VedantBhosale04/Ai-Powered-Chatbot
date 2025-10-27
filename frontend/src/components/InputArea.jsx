import { useState, useRef } from 'react'
import './InputArea.css'

function InputArea({ onSend, disabled }) {
  const [text, setText] = useState('')
  const [imageData, setImageData] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = () => {
    if (!text.trim() || disabled) return
    onSend(text, imageData)
    setText('')
    setImageData(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = (evt) => {
      const base64 = evt.target.result.split(',')[1]
      setImageData({
        mimeType: file.type,
        data: base64
      })
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setImageData(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="input-area" role="form" aria-label="Message composer">
      {imageData && (
        <div className="image-preview">
          <img 
            src={`data:${imageData.mimeType};base64,${imageData.data}`} 
            alt="Preview" 
          />
          <button 
            className="clear-image-btn" 
            onClick={clearImage}
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}
      <div className="input-controls">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          disabled={disabled}
          aria-label="Type your message"
          autoComplete="off"
        />
        <button
          className="icon-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          aria-label="Attach an image"
          title="Attach an image"
        >
          <img src="/img.svg" alt="Attach" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            hidden
            aria-hidden="true"
          />
        </button>
        <button
          className="icon-btn send-btn"
          onClick={handleSubmit}
          disabled={disabled || !text.trim()}
          aria-label="Send message"
          title="Send"
        >
          <img src="/submit.svg" alt="Send" />
        </button>
      </div>
    </div>
  )
}

export default InputArea
