const mongoose = require('mongoose')
const bannerSchema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  banner: {
    name: { type: String },
    items: [
      {
        title: { type: String },
        imgUrl: { type: String },
        targetUrl: { type: String },
      }
    ]
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Banner', bannerSchema, 'banners')