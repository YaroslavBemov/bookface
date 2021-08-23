const ArticleModel = require('../models/ArticleModel')

class ArticleService {
  async getAllArticles () {
    // const articles = await ArticleModel.find()

    return [
      {
        id: 1,
        title: 'Lorem 1',
        description: 'Lorem description 1'
      },
      {
        id: 2,
        title: 'Lorem 2',
        description: 'Lorem description 2'
      },
      {
        id: 3,
        title: 'Lorem 3',
        description: 'Lorem description 3'
      }
    ]
  }

}

module.exports = new ArticleService()
