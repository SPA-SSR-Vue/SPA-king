const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Item', itemSchema, 'items')