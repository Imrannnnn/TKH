import express from 'express';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// GET all inquiries
router.get('/', (req, res) => {
  const db = getDatabase();
  res.json(db?.inquiries || []);
});

// POST new inquiry (from public website forms)
router.post('/', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const newInquiry = {
    id: `inq-${Date.now()}`,
    name: req.body.name || 'Anonymous Donor/Volunteer',
    email: req.body.email || '',
    phone: req.body.phone || '',
    category: req.body.category || 'General',
    message: req.body.message || '',
    source: req.body.source || 'Website Form',
    status: 'New',
    date: new Date().toISOString().split('T')[0]
  };

  db.inquiries = [newInquiry, ...(db.inquiries || [])];
  saveDatabase(db);
  res.status(201).json(newInquiry);
});

// PUT update status
router.put('/:id/status', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  const { status } = req.body;
  const index = (db.inquiries || []).findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  db.inquiries[index].status = status;
  saveDatabase(db);
  res.json(db.inquiries[index]);
});

// DELETE inquiry
router.delete('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  db.inquiries = (db.inquiries || []).filter((i) => i.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: `Inquiry ${id} deleted` });
});

export default router;
