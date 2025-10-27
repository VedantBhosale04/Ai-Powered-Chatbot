const API_BASE = '/api'

export async function sendMessage(message, imageData) {
  const payload = {
    message,
    image: imageData || undefined
  }

  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `API error ${response.status}`)
  }

  return data.reply
}

export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`)
  return response.json()
}
