import express from 'express';
const router = express.Router();

// Simple demo login (no DB required)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'demo-token-123' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router; 