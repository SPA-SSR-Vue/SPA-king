const service = require('./hero.service')

module.exports = {
  async getHero(req, res) {
    let { category = '' } = req.query
    let items = []
    items = await service.findHeroes(req, category)
    res.send({
      success: true,
      message: '请求成功',
      data: items
    });

  }



}