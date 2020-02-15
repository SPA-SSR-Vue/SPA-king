const mongoose = require('mongoose')
const epigraphSchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Epigraph', epigraphSchema, 'epigraphs')