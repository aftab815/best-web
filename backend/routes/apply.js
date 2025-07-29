import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

// Create application
router.post('/', async (req, res) => {
  console.log('Received application:', req.body); // Debug: log all received fields
  try {
    const app = new Application(req.body);
    await app.save();
    res.status(201).json({ message: 'Application received' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save application' });
  }
});

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an application
router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 