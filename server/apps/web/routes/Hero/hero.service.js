const Category = require('../../../../libs/db/models/Category')
const Hero = require('../../../../libs/db/models/Hero')


module.exports = {
  async findHeroes(req, category) {
    const parentCat = await Category.findOne({ name: category })
    let childCat = await Category.find({ parent: parentCat._id })
    childCat = childCat.map(cat => cat._id)

    let heroes = await Category.aggregate([
      {
        $match: { parent: parentCat._id }
      },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])



    heroes.unshift({
      name: '热门',
      heroList: await Hero.find({
        categories: { $in: childCat }
      }).populate('categories').limit(10)
    })
    return heroes
  }
}