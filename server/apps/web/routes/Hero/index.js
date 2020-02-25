module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const controller = require('./hero.controller')

  router.get('/', controller.getHero)


  app.use('/web/api/hero', router);
}