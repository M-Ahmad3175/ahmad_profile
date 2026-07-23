const Profile = require("../models/Profile");

/* --------------------------------- Helpers ---------------------------------- */

const normalizeProfileData = (payload = {}) => {
  const normalized = { ...payload };

  if (normalized.email) {
    normalized.email = normalized.email.toLowerCase().trim();
  }

  if (normalized.fullName) {
    normalized.fullName = normalized.fullName.trim();
  }

  if (normalized.professionalTitle) {
    normalized.professionalTitle = normalized.professionalTitle.trim();
  }

  if (normalized.bio) {
    normalized.bio = normalized.bio.trim();
  }

  if (normalized.location) {
    normalized.location = normalized.location.trim();
  }

  if (normalized.phone) {
    normalized.phone = normalized.phone.trim();
  }

  if (normalized.whatsapp) {
    normalized.whatsapp = normalized.whatsapp.trim();
  }

  return normalized;
};

/* ------------------------------ Profile Service ------------------------------ */

const getProfile = async () => {
  try {
    const profile = await Profile.findOne({}).lean();
    return profile;
  } catch (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
};

const upsertProfile = async (payload = {}) => {
  try {
    const normalizedData = normalizeProfileData(payload);

    const existingProfile = await Profile.findOne({});

    if (existingProfile) {
      const updatedProfile = await Profile.findByIdAndUpdate(
        existingProfile._id,
        { $set: normalizedData },
        { new: true, runValidators: true }
      );

      return updatedProfile;
    }

    const createdProfile = await Profile.create(normalizedData);
    return createdProfile;
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error("A profile already exists.");
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw new Error(`Failed to save profile: ${error.message}`);
  }
};

module.exports = {
  getProfile,
  upsertProfile,
};
