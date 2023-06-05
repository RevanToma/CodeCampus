const LearningPath = require("../../models/learning-path-model");

module.exports = {
  home: async (req, res) => {
    const learningPaths = await LearningPath.find().lean();

    res.render("home", { title: "CodeCampus Start", learningPaths });
  },
};
