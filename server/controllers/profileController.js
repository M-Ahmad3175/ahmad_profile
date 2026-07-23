const profileService = require("../services/profileService");

// Get the single portfolio profile from the service layer.
const getProfile = async (req, res, next) => {
  try {
    // Ask the service for the profile data.
    const profile = await profileService.getProfile();

    // Send a successful response back to the client.
    return res.status(200).json({
      success: true,
      data: {
        profile,
      },
    });
  } catch (error) {
    // Pass any error to the next Express error handler.
    next(error);
  }
};

// Save or update the single portfolio profile through the service layer.
const saveProfile = async (req, res, next) => {
  try {
    // Send the request body to the service for create/update logic.
    const profile = await profileService.upsertProfile(req.body);

    // Return a success response with the saved profile.
    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: {
        profile,
      },
    });
  } catch (error) {
    // Pass any error to the next Express error handler.
    next(error);
  }
};

module.exports = {
  getProfile,
  saveProfile,
};
