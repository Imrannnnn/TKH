import express from 'express';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// GET all news
router.get('/', (req, res) => {
  const db = getDatabase();
  res.json(db?.news || []);
});

// POST new article
router.post('/', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const newArticle = {
    ...req.body,
    id: req.body.id || `news-${Date.now()}`
  };

  db.news = [newArticle, ...(db.news || [])];
  saveDatabase(db);
  res.status(201).json(newArticle);
});

// PUT update article
router.put('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  const index = (db.news || []).findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }

  db.news[index] = { ...db.news[index], ...req.body, id };
  saveDatabase(db);
  res.json(db.news[index]);
});

// DELETE article
router.delete('/:id', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { id } = req.params;
  db.news = (db.news || []).filter((n) => n.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: `Article ${id} deleted` });
});

export default router;
