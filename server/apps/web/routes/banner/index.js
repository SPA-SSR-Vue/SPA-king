module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const controller = require('./banner.controller')

  router.get('/banner', controller.getBanner)


  app.use('/web/api', router);
}