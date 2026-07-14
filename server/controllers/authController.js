const authService = require("../services/authService");

const login = async (req, res, next) => {
  try {
    const { token, admin } = await authService.loginAdmin(req.body);

    res.cookie("token", token, authService.getCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const admin = await authService.getAdminProfile(req.admin._id);

    return res.status(200).json({
      success: true,
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token", authService.getCookieOptions());

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  login,
  me,
  logout,
};
