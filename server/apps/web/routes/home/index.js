module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const controller = require('./home.controller')

  router.get('/banner', controller.getBanner)


  app.use('/web/api/home', router);
}