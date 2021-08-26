import { makeAutoObservable } from 'mobx'

export default class ChatStore {
  rootStore
  chatList = []

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
