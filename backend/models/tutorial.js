const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    chapters: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TutorialComment",
        required: true,
      },
    ],
    createdAt: { type: String, required: true },
    lastEditedAt: { type: String, required: true },
    lastModifiedAt: { type: String, require: true },
    lastModifiedAtDate: { type: Date, required: true },
    published: { type: Boolean, required: true, default: false },
  },
  { collection: "tutorials" }
);

const tutorialModel = mongoose.model("Tutorial", tutorialSchema);
module.exports = tutorialModel;
