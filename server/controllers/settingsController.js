const settingsService = require("../services/settingsService");

// Get portfolio settings.
async function getSettings(req, res, next) {
  try {
    const settings = await settingsService.getSettings();

    res.status(200).json({
      success: true,
      data: {
        settings,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create or update portfolio settings.
async function saveSettings(req, res, next) {
  try {
    const settings = await settingsService.saveSettings(req.body);

    res.status(200).json({
      success: true,
      message: "Portfolio settings saved successfully",
      data: {
        settings,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSettings,
  saveSettings,
};