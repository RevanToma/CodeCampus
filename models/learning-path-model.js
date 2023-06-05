const mongoose = require("mongoose");

const learningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A path must have a title"],
  },
  description: {
    type: String,
    required: [true, "A path must have a description"],
  },
  estimatedHours: {
    type: Number,
    required: [true, "A path must have an estimated hours"],
  },
  steps: [String],
});

module.exports = mongoose.model("LearningPath", learningPathSchema);
