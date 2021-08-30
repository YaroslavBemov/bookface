import { makeAutoObservable } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getChats() {
    const userId = await this.rootStore.userStore.user.id
    const response = await ChatService.getChats(userId)
    this.chats = response.data.chats
  }
}
