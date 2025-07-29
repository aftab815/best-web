import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bnwo';

async function seed() {
  await mongoose.connect(MONGO_URI);
  const exists = await Admin.findOne({ username: 'admin' });
  if (exists) {
    console.log('Admin already exists');
    process.exit();
  }
  const hash = await bcrypt.hash('admin123', 10);
  await Admin.create({ username: 'admin', password: hash });
  console.log('Admin user created: admin / admin123');
  process.exit();
}
seed(); 