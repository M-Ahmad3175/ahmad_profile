const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Number(process.env.COOKIE_MAX_AGE) || 60 * 60 * 1000,
});

const createToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
    },
    process.env.JWT_SECRET || "dev-secret",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );
};

const loginAdmin = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase();

  const admin = await Admin.findOne({ email: normalizedEmail }).select("+password");

  if (!admin) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = createToken(admin);

  return {
    token,
    admin: {
      id: admin._id,
      email: admin.email,
    },
  };
};

const getAdminProfile = async (adminId) => {
  const admin = await Admin.findById(adminId).select("-password");

  if (!admin) {
    const error = new Error("Admin not found");
    error.statusCode = 404;
    throw error;
  }

  return admin;
};

module.exports = {
  createToken,
  getCookieOptions,
  loginAdmin,
  getAdminProfile,
};
