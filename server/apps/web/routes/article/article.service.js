const Category = require('../../../../libs/db/models/Category')
const Article = require('../../../../libs/db/models/Article')

async function findNews(req, category) {
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
    }, {
      $addFields: {
        'newsList': {
          $slice: ['$newsList', 5]
        }
      }
    }
  ])


  let hotNewsList = await Article.aggregate([
    {
      $match: { categories: { $in: childCat } }
    },
    {
      $sample: { size: 5 }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories'
      }
    }
  ])


  news.unshift({
    name: '热门',
    newsList: hotNewsList
    //   await Article.find({
    //   categories: { $in: childCat }
    // }).populate('categories').limit(5).lean()
  })

  news.map((item, index) => {
    item.newsList.map((n, i) => {
      n.category = item.name === '热门' ? n.categories[0].name : n.category = item.name
      return n
    })
    return item
  })

  return news
}

async function findStrategies(req, category) {
  const parentCat = await Category.findOne({ name: category })
  let childCat = await Category.find({ parent: parentCat._id })
  childCat = childCat.map(cat => cat._id)

  let strategies = await Category.aggregate([
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

  strategies.unshift({
    name: '最新',
    strategyList: await Article.find({
      categories: { $in: childCat }
    }).limit(16).sort({ createdAt: -1 })
  })

  return strategies
}




module.exports = {
  findNews,
  findStrategies,
}