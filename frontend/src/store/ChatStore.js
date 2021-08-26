import { makeAutoObservable } from 'mobx'

export default class ChatStore {
  rootStore

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
