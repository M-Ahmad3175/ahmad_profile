require("dotenv").config();

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      process.exit(0);
    }

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed admin.");
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();