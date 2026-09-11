import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'data', 'db.json');
const DEFAULT_BACKUP_PATH = path.join(__dirname, 'data', 'db_default.json');

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Create backup copy of original defaults if not already present
if (fs.existsSync(DB_PATH) && !fs.existsSync(DEFAULT_BACKUP_PATH)) {
  fs.copyFileSync(DB_PATH, DEFAULT_BACKUP_PATH);
}

export function getDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      if (fs.existsSync(DEFAULT_BACKUP_PATH)) {
        fs.copyFileSync(DEFAULT_BACKUP_PATH, DB_PATH);
      } else {
        return null;
      }
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database from disk:', err);
    return null;
  }
}

export function saveDatabase(data) {
  try {
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_PATH);
    return true;
  } catch (err) {
    console.error('Error writing database to disk:', err);
    return false;
  }
}

export function resetDatabase() {
  try {
    if (fs.existsSync(DEFAULT_BACKUP_PATH)) {
      fs.copyFileSync(DEFAULT_BACKUP_PATH, DB_PATH);
      return getDatabase();
    }
    return null;
  } catch (err) {
    console.error('Error resetting database:', err);
    return null;
  }
}
