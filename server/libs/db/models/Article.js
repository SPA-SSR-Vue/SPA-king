const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  cover: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
}, {
  timestamps: true,
})

module.exports = mongoose.model('Article', articleSchema, 'articles')