module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const controller = require('./video.controller')

  router.get('/', controller.getVideo)


  app.use('/web/api/video', router);
}