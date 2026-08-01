const dashboardService = require("../services/dashboardService");

// Get dashboard statistics.
async function getDashboardStatistics(req, res, next) {
  try {
    const statistics = await dashboardService.getDashboardStatistics();

    res.status(200).json({
      success: true,
      data: {
        statistics,
      },
    });
  } catch (error) {
    console.error("Dashboard Controller Error:", error);
    next(error);
  }
}

module.exports = {
  getDashboardStatistics,
};