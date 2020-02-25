const service = require('./article.service')

module.exports = {
  async getArticle(req, res) {
    let { category = '' } = req.query
    let items = []
    switch (category) {
      case 'news':
        items = await service.findNews(req, category)
        break;
      case 'strategy':
        items = await service.findStrategies(req, category)
        break;
      default:
        break;
    }
    res.send({
      success: true,
      message: '请求成功',
      data: items
    });
  }
}