import express from 'express';
import { getDatabase, saveDatabase, resetDatabase } from '../storage.js';

const router = express.Router();

// GET /api/data - Full site dataset
router.get('/', (req, res) => {
  const db = getDatabase();
  if (!db) {
    return res.status(500).json({ error: 'Failed to read database' });
  }

  // Omit private password from response
  const { admin, ...safeData } = db;
  res.json(safeData);
});

// POST /api/data/reset - Restore default records
router.post('/reset', (req, res) => {
  const restored = resetDatabase();
  if (!restored) {
    return res.status(500).json({ error: 'Failed to reset database' });
  }
  const { admin, ...safeData } = restored;
  res.json({ success: true, message: 'Platform data restored to default seed state', data: safeData });
});

// POST /api/data/import - Import backup JSON
router.post('/import', (req, res) => {
  const importedData = req.body;
  if (!importedData || typeof importedData !== 'object') {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const currentDb = getDatabase() || {};
  const newDb = {
    ...currentDb,
    news: importedData.news || currentDb.news,
    outreaches: importedData.outreaches || currentDb.outreaches,
    metrics: importedData.metrics || currentDb.metrics,
    allocations: importedData.allocations || currentDb.allocations,
    documents: importedData.documents || currentDb.documents,
    announcement: importedData.announcement ?? currentDb.announcement,
    inquiries: importedData.inquiries || currentDb.inquiries
  };

  saveDatabase(newDb);
  const { admin, ...safeData } = newDb;
  res.json({ success: true, data: safeData });
});

export default router;
