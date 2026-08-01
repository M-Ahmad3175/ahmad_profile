const Project = require("../models/Project");
const Skill = require("../models/skillModel");
const Certificate = require("../models/certificateModel");
const Experience = require("../models/experienceModel");
const Education = require("../models/educationModel");
const Message = require("../models/messageModel");
const Resume = require("../models/resumeModel");

// Get dashboard statistics.
async function getDashboardStatistics() {
  try {
    const [
      projects,
      skills,
      certificates,
      experiences,
      education,
      messages,
      unreadMessages,
      resumes,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certificate.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Resume.countDocuments(),
    ]);

    return {
      projects,
      skills,
      certificates,
      experiences,
      education,
      messages,
      unreadMessages,
      resumes,
    };
  } catch (error) {
  console.error("Dashboard Service Error:", error);
  throw error;

}
}

module.exports = {
  getDashboardStatistics,
};