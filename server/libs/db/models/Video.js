const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    coverImg: { type: String },
    videoUrl: { type: String },
    play: { type: Number },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    isHot: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", schema, "videos");
