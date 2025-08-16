const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Untitled Form",
    },
    headerImage: {
      type: String,
      default: "",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
