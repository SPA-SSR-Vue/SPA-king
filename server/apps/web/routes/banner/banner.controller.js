const service = require('./banner.service')

module.exports = {
  async getBanner(req, res) {
    const { name = '' } = req.query
    const banner = await service.findBanner(req, name)
    res.send({
      success: true,
      message: '请求成功',
      data: banner
    });
  }
}