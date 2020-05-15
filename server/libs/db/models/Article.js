const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    title: { type: String },
    content: { type: String },
    coverImg: { type: String },
    desc: { type: String },
    isHot: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", schema, "articles");
