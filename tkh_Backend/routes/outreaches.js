import express from 'express';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// GET all outreaches
router.get('/', (req, res) => {
  const db = getDatabase();
  res.json(db?.outreaches || []);
});

// POST new outreach
router.post('/', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const newOutreach = {
    ...req.body,
    id: req.body.id || `outreach-${Date.now()}`
  };

  db.outreaches = [newOutreach, ...(db.outreaches || [])];
  saveDatabase(db);
  res.status(201).json(newOutreach);
});

// PUT update outreach
router.put('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  const index = (db.outreaches || []).findIndex((o) => o.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Outreach not found' });
  }

  db.outreaches[index] = { ...db.outreaches[index], ...req.body, id };
  saveDatabase(db);
  res.json(db.outreaches[index]);
});

// DELETE outreach
router.delete('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  db.outreaches = (db.outreaches || []).filter((o) => o.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: `Outreach ${id} deleted` });
});

export default router;
