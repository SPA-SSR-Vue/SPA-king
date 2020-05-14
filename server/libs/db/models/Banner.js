const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    name: { type: String },
    tag: { type: String },
    items: [
      {
        title: { type: String },
        coverImg: { type: String },
        targetUrl: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", schema, "banners");
