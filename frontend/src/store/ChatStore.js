import { makeAutoObservable } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
  party = []
  currentChatId = ''

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getChats () {
    const userId = await this.rootStore.userStore.user.id
    const response = await ChatService.getChats(userId)
    this.chats = response.data.chats
  }

  async getMessages (chatId) {

  }

  setCurrentChatId (chatId) {
    this.currentChatId = chatId
  }

  setParty () {
    if (this.chats.length > 0) {
      this.party = this.chats.map(item => {
        const id = item._id
        const members = item.party
          .filter(member => member.id !== this.rootStore.userStore.user.id)
          .map(member => member.name)
        return { id, members }
      })
    }
  }
}
