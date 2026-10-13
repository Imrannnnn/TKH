import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { getDatabase, saveDatabase } from '../storage.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password'
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    // 1. Try finding admin in MongoDB
    const adminUser = await Admin.findOne({ email: cleanEmail, isActive: true });

    if (adminUser) {
      const isMatch = await adminUser.comparePassword(password);
      if (isMatch) {
        adminUser.lastLogin = new Date();
        await adminUser.save();

        return res.json({
          success: true,
          token: `tkh_token_${adminUser._id}_${Date.now()}`,
          user: {
            id: adminUser._id,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role || 'superadmin'
          },
          source: 'mongodb'
        });
      }
    }
  } catch (err) {
    console.warn('MongoDB query deferred during auth, falling back to secure local storage:', err.message);
  }

  // 2. Fallback to local db.json storage / environment variables
  const db = getDatabase();
  const fallbackEmail = (process.env.ADMIN_EMAIL || db?.admin?.email || 'admin@tenkindhands.org').toLowerCase();
  const fallbackPassword = process.env.ADMIN_PASSWORD;
  const fallbackHash = db?.admin?.passwordHash;
  const fallbackName = db?.admin?.name || 'Ten Kind Hands Super Admin';

  let isMatch = false;
  if (cleanEmail === fallbackEmail) {
    if (fallbackHash) {
      try {
        isMatch = await bcrypt.compare(password, fallbackHash);
      } catch {
        isMatch = false;
      }
    } else if (fallbackPassword) {
      isMatch = password === fallbackPassword;
    }
  }

  if (isMatch) {
    return res.json({
      success: true,
      token: `tkh_token_local_${Date.now()}`,
      user: {
        email: fallbackEmail,
        name: fallbackName,
        role: db?.admin?.role || 'superadmin'
      },
      source: 'local_storage_fallback'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password.'
  });
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const admin = await Admin.findOne({ isActive: true }).select('-password');
    if (admin) {
      return res.json({ success: true, admin });
    }
  } catch (err) {
    // fallback
  }

  const db = getDatabase();
  return res.json({
    success: true,
    admin: {
      email: db?.admin?.email || process.env.ADMIN_EMAIL || 'admin@tenkindhands.org',
      name: db?.admin?.name || 'Super Admin',
      role: 'superadmin'
    }
  });
});

// POST /api/auth/change-password
router.post('/change-password', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!newPassword || newPassword.trim().length < 4) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 4 characters long.'
    });
  }

  const cleanEmail = (email || 'admin@tenkindhands.org').trim().toLowerCase();
  const db = getDatabase() || {};
  let validatedCurrent = false;

  // 1. Try finding admin in MongoDB
  try {
    const adminUser = await Admin.findOne({ email: cleanEmail, isActive: true });
    if (adminUser) {
      if (currentPassword) {
        const isMatch = await adminUser.comparePassword(currentPassword);
        if (isMatch) {
          validatedCurrent = true;
        } else {
          return res.status(401).json({
            success: false,
            message: 'Current password does not match.'
          });
        }
      } else {
        validatedCurrent = true;
      }

      adminUser.password = newPassword.trim();
      await adminUser.save();
    }
  } catch (err) {
    console.warn('MongoDB query deferred during password update, updating local storage:', err.message);
  }

  // 2. Validate current password against local db fallback if provided & not validated in Mongo
  if (currentPassword && !validatedCurrent) {
    const fallbackHash = db?.admin?.passwordHash;
    const fallbackEnv = process.env.ADMIN_PASSWORD;
    let validCurrent = false;

    if (fallbackHash) {
      try {
        validCurrent = await bcrypt.compare(currentPassword, fallbackHash);
      } catch {
        validCurrent = false;
      }
    } else if (fallbackEnv) {
      validCurrent = currentPassword === fallbackEnv;
    }

    if (!validCurrent) {
      return res.status(401).json({
        success: false,
        message: 'Current password does not match.'
      });
    }
  }

  // 3. Update local db.json storage with bcrypt hash (never plaintext)
  try {
    if (!db.admin) {
      db.admin = {
        email: cleanEmail,
        name: 'Ten Kind Hands Super Admin',
        role: 'superadmin'
      };
    }
    const salt = await bcrypt.genSalt(10);
    db.admin.passwordHash = await bcrypt.hash(newPassword.trim(), salt);
    delete db.admin.password;
    db.admin.updatedAt = new Date().toISOString();
    saveDatabase(db);
  } catch (err) {
    console.error('Failed to update local db.json:', err);
  }

  return res.json({
    success: true,
    message: 'Admin password changed successfully!'
  });
});

export default router;
