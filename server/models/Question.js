const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },

  questionText: {
    type: String,
    required: true,
  },

  questionImage: {
    type: String,
    default: "",
  },

  questionType: {
    type: String,
    required: true,
    enum: ["Categorize", "Cloze", "Comprehension"],
  },

  data: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Question", questionSchema);
