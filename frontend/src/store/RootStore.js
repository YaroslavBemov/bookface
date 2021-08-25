import UserStore from './UserStore'
import ArticleStore from './ArticleStore'

export default class RootStore {
  userStore
  articleStore

  constructor () {
    this.userStore = new UserStore(this)
    this.articleStore = new ArticleStore(this)
  }
}
