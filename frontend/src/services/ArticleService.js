import $api from '../http'

export default class ArticleService {
  static async fetchArticles () {
    return $api.get('/articles', )
  }
}
