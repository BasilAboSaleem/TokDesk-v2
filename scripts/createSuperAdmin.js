require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../app/models/User');
const ROLES = require('../app/constants/roles');
const connectDB = require('../config/db');

async function ensureSuperAdmin() {
  try {
    await connectDB();

    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME || 'System Owner';

    if (!email || !password) {
      console.error("❌ Please set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in your .env file.");
      process.exit(1);
    }

    // check if any super admin exists
    let superAdmin = await User.findOne({ email });

    if (superAdmin) {
      // updated existing user to super admin role if not already
      if (!superAdmin.role || superAdmin.role !== ROLES.SUPER_ADMIN) {
        superAdmin.role = ROLES.SUPER_ADMIN;
        await superAdmin.save();
        console.log("✔ Existing user updated to Super Admin role!");
      } else {
        console.log("⚠ Super Admin already exists with correct role.");
      }
    } else {
      // creat a new super admin
      superAdmin = new User({
        name,
        email,
        password,
        role: ROLES.SUPER_ADMIN,
        company: null,
        department: null
      });
      await superAdmin.save();
      console.log("✔ Super Admin created successfully!");
    }

    console.log(`Email: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error ensuring super admin:", err);
    process.exit(1);
  }
}

ensureSuperAdmin();
