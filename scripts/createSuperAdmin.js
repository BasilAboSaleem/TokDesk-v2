require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../app/models/User');
const ROLES = require('../app/constants/roles');
const connectDB = require('../config/db');

async function createSuperAdmin() {
  try {
    await connectDB();

    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME || 'System Owner';

    if (!email || !password) {
      console.error("❌ Please set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in your .env file.");
      process.exit(1);
    }

    //  1. check if ANY super admin already exists
    const existingSA = await User.findOne({ role: ROLES.SUPER_ADMIN });
    if (existingSA) {
      console.log("⚠ Super Admin already exists. Cannot create another one.");
      process.exit(0);
    }

    //  2. create super admin (first and only one)
    const user = new User({
      name,
      email,
      password,  
      role: ROLES.SUPER_ADMIN,
      company: null,
      department: null
    });

    await user.save();

    console.log("✔ Super Admin created successfully!");
    console.log(`Email: ${email}`);
    process.exit(0);

  } catch (err) {
    console.error("❌ Error creating super admin:", err);
    process.exit(1);
  }
}

createSuperAdmin();
