import express from 'express';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// GET allocations & documents
router.get('/', (req, res) => {
  const db = getDatabase();
  res.json({
    allocations: db?.allocations || [],
    documents: db?.documents || []
  });
});

// PUT update allocations array
router.put('/allocations', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  if (Array.isArray(req.body)) {
    db.allocations = req.body;
    saveDatabase(db);
    return res.json(db.allocations);
  }

  res.status(400).json({ error: 'Expected array of allocation items' });
});

// POST add compliance document
router.post('/documents', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const newDoc = {
    ...req.body,
    id: req.body.id || `doc-${Date.now()}`
  };

  db.documents = [...(db.documents || []), newDoc];
  saveDatabase(db);
  res.status(201).json(newDoc);
});

// DELETE compliance document
router.delete('/documents/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  db.documents = (db.documents || []).filter((d) => d.id !== id && d.title !== id);
  saveDatabase(db);
  res.json({ success: true, message: `Document deleted` });
});

export default router;
