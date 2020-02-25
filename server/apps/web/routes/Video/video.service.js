const Category = require('../../../../libs/db/models/Category')
const Video = require('../../../../libs/db/models/Video')


module.exports = {
  async findVideos(req, category) {
    const parentCat = await Category.findOne({ name: category })
    let childCat = await Category.find({ parent: parentCat._id })
    childCat = childCat.map(cat => cat._id)

    let heroes = await Category.aggregate([
      {
        $match: { parent: parentCat._id }
      },
      {
        $lookup: {
          from: 'videos',
          localField: '_id',
          foreignField: 'categories',
          as: 'videoList'
        }
      }
    ])

    return heroes
  }
}