const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Category', categorySchema, 'categories')