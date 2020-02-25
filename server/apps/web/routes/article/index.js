module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const controller = require('./article.controller')

  router.get('/', controller.getArticle)


  app.use('/web/api/article', router);
}