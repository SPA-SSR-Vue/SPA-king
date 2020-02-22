const service = require('./home.service')


module.exports = {
  async getBanner(req, res) {
    let query = req.query.query ? JSON.parse(req.query.query) : {}
    const result = await service.findBanner(req, query)
    res.send(result);

  }



}