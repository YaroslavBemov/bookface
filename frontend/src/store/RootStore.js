import UserStore from './UserStore'
import UsersStore from './UsersStore'
import ChatStore from './ChatStore'
import ArticleStore from './ArticleStore'

export default class RootStore {
  userStore
  usersStore
  chatStore
  articleStore

  constructor() {
    this.userStore = new UserStore(this)
    this.usersStore = new UsersStore(this)
    this.chatStore = new ChatStore(this)
    this.articleStore = new ArticleStore(this)
  }
}
