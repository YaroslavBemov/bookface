import { makeAutoObservable, runInAction, toJS } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
  chatList = []
  currentChat = []
  currentChatId = ''

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getChats () {
    try {
      const userId = await this.rootStore.userStore.user.id
      const response = await ChatService.getChats(userId)
      this.chats = response.data.chats
      this.getChatList()
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  getChatList () {
    const party = this.chats.map(chat => chat.party)
    this.chatList = party
      .map(members => members
        .filter(member => member.id !== this.rootStore.userStore.user.id))

  }

  setCurrentChatId (chatId) {
    this.currentChatId = chatId
  }

  getCurrentChat () {
    this.currentChat = this.chats.filter(chat => {
      console.log(toJS(chat))
      return chat._id === this.currentChatId
    })
    console.log(toJS(this.currentChat))
  }

  async addMessage (content, chatId = this.currentChatId) {
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

}
