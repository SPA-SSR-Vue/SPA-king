const Banner = require('./../../../../libs/db/models/Banner')


module.exports = {
  async findBanner(req, query) {
    const item = await Banner.findOne().setOptions(query || {})
    return {
      success: true,
      message: '请求成功',
      data: item
    }
  }



}