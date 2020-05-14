const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema({
  hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
  name: { type: String },
  icon: { type: String },
  desc: { type: String },
  coolDown: { type: String },
  expend: { type: String },
});

module.exports = mongoose.model("Skill", skillSchema, "skills");
