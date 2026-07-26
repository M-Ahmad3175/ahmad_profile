const Settings = require("../models/settingsModel");

// Helper to clean the incoming settings data before saving.
function normalizeSettingsData(payload) {
  return {
    websiteTitle: payload.websiteTitle?.trim(),
    websiteDescription: payload.websiteDescription?.trim(),
    seoKeywords: payload.seoKeywords || [],
    logoUrl: payload.logoUrl?.trim() || "",
    faviconUrl: payload.faviconUrl?.trim() || "",
    primaryColor: payload.primaryColor?.trim() || "#2563eb",
    resumeUrl: payload.resumeUrl?.trim() || "",
    footerText: payload.footerText?.trim(),
    contactEmail: payload.contactEmail?.trim().toLowerCase(),
    contactPhone: payload.contactPhone?.trim(),
    address: payload.address?.trim(),
  };
}

// Get portfolio settings.
async function getSettings() {
  try {
    const settings = await Settings.findOne();

    return settings;
  } catch (error) {
    const err = new Error("Failed to fetch settings");
    err.statusCode = 500;
    throw err;
  }
}

// Create or update portfolio settings.
async function saveSettings(payload) {
  try {
    const normalizedData = normalizeSettingsData(payload);

    const settings = await Settings.findOneAndUpdate(
      {},
      normalizedData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return settings;
  } catch (error) {
    const err = new Error("Failed to save settings");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeSettingsData,
  getSettings,
  saveSettings,
};