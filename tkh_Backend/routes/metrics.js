import express from 'express';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// GET all metrics
router.get('/', (req, res) => {
  const db = getDatabase();
  res.json(db?.metrics || []);
});

// POST new metric
router.post('/', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const newMetric = {
    ...req.body,
    id: req.body.id || `metric-${Date.now()}`
  };

  db.metrics = [...(db.metrics || []), newMetric];
  saveDatabase(db);
  res.status(201).json(newMetric);
});

// PUT update metric
router.put('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  const index = (db.metrics || []).findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Metric not found' });
  }

  db.metrics[index] = { ...db.metrics[index], ...req.body, id };
  saveDatabase(db);
  res.json(db.metrics[index]);
});

// DELETE metric
router.delete('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  db.metrics = (db.metrics || []).filter((m) => m.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: `Metric ${id} deleted` });
});

export default router;
