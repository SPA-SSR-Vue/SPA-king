const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    coverImg: { type: String },
    play: { type: Number },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema, "videos");
