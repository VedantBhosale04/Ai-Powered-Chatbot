// Express backend that proxies chat requests to Google Gemini
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// CORS for frontend on port 5173 (Vite default)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasKey: !!GEMINI_KEY });
});

app.post('/api/chat', async (req, res) => {
  try {
    if (!GEMINI_KEY) {
      return res.status(503).json({ 
        error: 'Server missing GEMINI_API_KEY. Add it to .env and restart.' 
      });
    }

    const { message, image } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const parts = [{ text: message }];
    if (image && image.data && image.mimeType) {
      parts.push({ 
        inlineData: { 
          mimeType: image.mimeType, 
          data: image.data 
        } 
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
    const body = JSON.stringify({ contents: [{ parts }] });

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_KEY
      },
      body
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Gemini API error:', resp.status, text);
      return res.status(resp.status).json({ 
        error: `Upstream error ${resp.status}`, 
        details: text 
      });
    }

    const data = await resp.json();
    const reply = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();

    return res.json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`API key ${GEMINI_KEY ? 'loaded ✓' : 'MISSING ✗'}`);
});
