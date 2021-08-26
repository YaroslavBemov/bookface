import UserStore from './UserStore'
import ArticleStore from './ArticleStore'
import ChatStore from './ChatStore'

export default class RootStore {
  userStore
  articleStore
  chatStore

  constructor () {
    this.userStore = new UserStore(this)
    this.articleStore = new ArticleStore(this)
    this.chatStore = new ChatStore(this)
  }
}
