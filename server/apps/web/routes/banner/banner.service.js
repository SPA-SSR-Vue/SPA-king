const Banner = require('../../../../libs/db/models/Banner')

module.exports = {
  async findBanner(req, name) {
    const banner = await Banner.findOne({ name })
    return banner
  }
}