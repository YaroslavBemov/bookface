import { makeAutoObservable } from 'mobx'

export default class ArticleStore {
  article = 'Article'
  rootStore

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
