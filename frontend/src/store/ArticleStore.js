import { makeAutoObservable } from 'mobx'

export default class ArticleStore {
  articles = []
  rootStore

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
