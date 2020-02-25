const service = require('./video.service')

module.exports = {
  async getVideo(req, res) {
    let { category = '' } = req.query
    let items = []
    items = await service.findVideos(req, category)
    res.send({
      success: true,
      message: '请求成功',
      data: items
    });

  }



}