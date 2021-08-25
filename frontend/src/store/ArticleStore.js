import { makeAutoObservable } from 'mobx'

export default class ArticleStore {
  rootStore
  article = 'Article'

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
