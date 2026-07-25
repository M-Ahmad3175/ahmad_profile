const socialLinkService = require("../services/socialLinkService");

// Get portfolio social links.
async function getSocialLinks(req, res, next) {
  try {
    const socialLinks = await socialLinkService.getSocialLinks();

    res.status(200).json({
      success: true,
      data: {
        socialLinks,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create or update portfolio social links.
async function saveSocialLinks(req, res, next) {
  try {
    const socialLinks = await socialLinkService.saveSocialLinks(req.body);

    res.status(200).json({
      success: true,
      message: "Social links saved successfully",
      data: {
        socialLinks,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSocialLinks,
  saveSocialLinks,
};