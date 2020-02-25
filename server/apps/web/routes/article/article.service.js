const Category = require('../../../../libs/db/models/Category')
const Article = require('../../../../libs/db/models/Article')

module.exports = {
  async findNews(req, category) {
    const parentCat = await Category.findOne({ name: category })
    let childCat = await Category.find({ parent: parentCat._id })
    childCat = childCat.map(cat => cat._id)

    let news = await Category.aggregate([
      {
        $match: { parent: parentCat._id }
      },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      }
    ])



    news.unshift({
      name: '热门',
      newsList: await Article.find({
        categories: { $in: childCat }
      }).populate('categories').limit(5)
    })

    news.map((item, index) => {
      item.newsList.map((n, i) => {
        n.category = item.name
        return n
      })
      return item
    })

    return news
  },

  async findStrategies(req, category) {
    const parentCat = await Category.findOne({ name: category })
    let childCat = await Category.find({ parent: parentCat._id })
    childCat = childCat.map(cat => cat._id)

    let news = await Category.aggregate([
      {
        $match: { parent: parentCat._id }
      },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'strategyList'
        }
      }
    ])



    news.unshift({
      name: '最新',
      strategyList: await Article.find().limit(16).sort("-1")
    })

    news.map((item, index) => {
      item.strategyList.map((n, i) => {
        n.category = item.name
        return n
      })
      return item
    })

    return news
  },
}