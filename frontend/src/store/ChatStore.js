import { makeAutoObservable, runInAction, toJS } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
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

  async addMessage(content, chatId = this.currentChatId) {
    try {
      const response = await ChatService.addMessage(content, chatId)

      runInAction(() => {
        this.chats.map(chat => {
          return chat._id === chatId ? chat = response : null
        })
        console.log(toJS(this.chats))
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  setCurrentChatId (chatId) {
    this.currentChatId = chatId
  }
}
