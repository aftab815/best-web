import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import applyRoutes from './routes/apply.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the parent directory (project root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/apply', applyRoutes);

// Serve admin login HTML
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Simple auth middleware for dashboard (demo: check cookie)
app.get('/admin-dashboard', (req, res, next) => {
  const cookie = req.headers.cookie || '';
  if (!cookie.includes('adminToken')) {
    return res.redirect('/admin-login');
  }
  next();
}, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bnwo';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err)); 