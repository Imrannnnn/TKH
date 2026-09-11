import express from 'express';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// GET current header announcement
router.get('/', (req, res) => {
  const db = getDatabase();
  res.json({ announcement: db?.announcement || '' });
});

// PUT update header announcement
router.put('/', (req, res) => {
  const db = getDatabase();
  if (!db) return res.status(500).json({ error: 'Database unavailable' });

  const { announcement } = req.body;
  db.announcement = typeof announcement === 'string' ? announcement : '';
  saveDatabase(db);
  res.json({ success: true, announcement: db.announcement });
});

export default router;
