const SocialLink = require("../models/socialLinkModel");

// Helper to clean incoming social link data before saving or updating.
function normalizeSocialLinkData(payload) {
  return {
    github: payload.github?.trim(),
    linkedin: payload.linkedin?.trim(),
    leetcode: payload.leetcode?.trim(),
    topcoder: payload.topcoder?.trim(),
    x: payload.x?.trim(),
    whatsapp: payload.whatsapp?.trim(),
    email: payload.email?.trim(),
    resume: payload.resume?.trim(),
  };
}

// Get the portfolio social links.
async function getSocialLinks() {
  try {
    return await SocialLink.findOne().lean();
  } catch (error) {
    const err = new Error("Failed to fetch social links");
    err.statusCode = 500;
    throw err;
  }
}

// Create or update the portfolio social links.
async function saveSocialLinks(payload) {
  try {
    const normalizedData = normalizeSocialLinkData(payload);

    return await SocialLink.findOneAndUpdate(
      {},
      normalizedData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
  } catch (error) {
    const err = new Error("Failed to save social links");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeSocialLinkData,
  getSocialLinks,
  saveSocialLinks,
};