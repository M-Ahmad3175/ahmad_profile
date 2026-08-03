const Profile = require("../models/Profile");

function normalizeSocialLinkItem(item = {}, index = 0) {
  const platform = (item.platform || item.name || item.label || `Link ${index + 1}`)
    .toString()
    .trim();
  const rawUrl = item.url || item.href || item.link || "";
  const url = rawUrl.toString().trim();

  if (!platform || !url) {
    return null;
  }

  return {
    platform,
    url,
    enabled: item.enabled !== false,
    order: typeof item.order === "number" ? item.order : index,
  };
}

function normalizeSocialLinkData(payload = {}) {
  if (Array.isArray(payload)) {
    return payload
      .map((item, index) => normalizeSocialLinkItem(item, index))
      .filter(Boolean);
  }

  if (Array.isArray(payload.socialLinks)) {
    return payload.socialLinks
      .map((item, index) => normalizeSocialLinkItem(item, index))
      .filter(Boolean);
  }

  const legacyEntries = Object.entries(payload)
    .filter(
      ([key, value]) =>
        key !== "socialLinks" &&
        typeof value === "string" &&
        value.trim() &&
        ["github", "linkedin", "leetcode", "topcoder", "x", "whatsapp", "email", "portfolio", "resume"].includes(key)
    )
    .map(([key, value], index) => {
      const platformMap = {
        github: "GitHub",
        linkedin: "LinkedIn",
        leetcode: "LeetCode",
        topcoder: "TopCoder",
        x: "X",
        whatsapp: "WhatsApp",
        email: "Email",
        portfolio: "Portfolio",
        resume: "Resume",
      };

      return normalizeSocialLinkItem({ platform: platformMap[key], url: value }, index);
    })
    .filter(Boolean);

  return legacyEntries;
}

// Get the portfolio social links.
async function getSocialLinks() {
  try {
    const profile = await Profile.findOne({}).lean();
    return profile?.socialLinks || [];
  } catch (error) {
    const err = new Error("Failed to fetch social links");
    err.statusCode = 500;
    throw err;
  }
}

// Create or update the portfolio social links.
async function saveSocialLinks(payload) {
  try {
    const incomingLinks = normalizeSocialLinkData(payload);
    const existingProfile = await Profile.findOne({});
    const existingLinks = Array.isArray(existingProfile?.socialLinks) ? existingProfile.socialLinks : [];
    const mergedLinks = [...existingLinks, ...incomingLinks].filter(
      (item, index, collection) =>
        index ===
        collection.findIndex(
          (candidate) => candidate.platform === item.platform && candidate.url === item.url
        )
    );

    if (existingProfile) {
      const updatedProfile = await Profile.findByIdAndUpdate(
        existingProfile._id,
        { $set: { socialLinks: mergedLinks } },
        { new: true, runValidators: true }
      );

      return updatedProfile.socialLinks || [];
    }

    const createdProfile = await Profile.create({
      fullName: "Portfolio Owner",
      email: process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com",
      professionalTitle: "Developer",
      bio: "",
      location: "",
      socialLinks: mergedLinks,
    });

    return createdProfile.socialLinks || [];
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