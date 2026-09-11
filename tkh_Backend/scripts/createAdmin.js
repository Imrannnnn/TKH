import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { getDatabase, saveDatabase } from '../storage.js';

dotenv.config();

async function createOrUpdateAdmin() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ Error: MONGO_URI is missing from your .env file!');
    process.exit(1);
  }

  // Get credentials from command line args or use defaults
  const args = process.argv.slice(2);
  const email = (args[0] || process.env.ADMIN_EMAIL || 'admin@tenkindhands.org').trim().toLowerCase();
  const password = args[1] || process.env.ADMIN_PASSWORD || 'admin2026';
  const name = args[2] || process.env.ADMIN_NAME || 'Ten Kind Hands Super Admin';
  const role = 'superadmin';

  console.log('====================================================');
  console.log('🌱 Ten Kind Hands — Super Admin Creation Script');
  console.log('====================================================');
  console.log(`Connecting to MongoDB...`);

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas successfully.\n');

    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log(`ℹ️  Admin with email "${email}" already exists.`);
      console.log(`🔄 Updating password and ensuring superadmin role...`);
      admin.password = password; // Will be hashed automatically by pre-save hook
      admin.name = name;
      admin.role = role;
      admin.isActive = true;
      await admin.save();
      console.log('✅ Admin credentials updated successfully in MongoDB!');
    } else {
      console.log(`🆕 Creating new Super Admin account for "${email}"...`);
      admin = new Admin({
        name,
        email,
        password,
        role,
        isActive: true
      });
      await admin.save();
      console.log('✅ Super Admin account created successfully in MongoDB!');
    }

    // Synchronize data/db.json storage for offline resilience
    try {
      const db = getDatabase() || {};
      db.admin = {
        email,
        password,
        name,
        role,
        updatedAt: new Date().toISOString()
      };
      saveDatabase(db);
      console.log('✅ Synced credentials to local storage fallback.');
    } catch (e) {
      console.warn('⚠️  Could not update local storage backup:', e.message);
    }

    console.log('\n====================================================');
    console.log('🎉 SUPER ADMIN READY TO USE!');
    console.log('====================================================');
    console.log(`👤 Name:     ${name}`);
    console.log(`📧 Email:    ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🛡️  Role:     ${role}`);
    console.log('====================================================');
    console.log(`🔗 Dashboard URL: http://localhost:5173/#admin`);
    console.log('====================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin in database:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createOrUpdateAdmin();
