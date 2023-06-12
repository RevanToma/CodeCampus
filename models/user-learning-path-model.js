const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLearningPathSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or whatever your user model is named
    required: true,
  },
  learningPaths: [
    {
      learningPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningPath",
      },
      startedAt: Date,
    },
  ],
});

module.exports = mongoose.model("UserLearningPath", userLearningPathSchema);
