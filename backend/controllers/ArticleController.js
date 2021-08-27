const ArticleService = require('../services/ArticleService')

class ArticleController {
  async index (req, res, next) {
    try {
      const articles = await ArticleService.getAllArticles()

      return res.json(articles)
    } catch (e) {
      next(e)
    }
  }

  async store (req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async show (req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async update (req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async destroy (req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }
}

module.exports = new ArticleController()
