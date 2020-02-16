const mongoose = require('mongoose')
const skillSchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  description: { type: String },
  coolDown: { type: String },
  expend: { type: String },
  hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }
})

module.exports = mongoose.model('Skill', skillSchema, 'skills')