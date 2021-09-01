import { makeAutoObservable, runInAction, toJS } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
  chatList = []
  currentChat = []
  currentChatId = ''
  loading = false
  hasErrors = false
  userId

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getChats () {
    runInAction(() => {
      this.loading = true
      console.log('loading ' + this.loading)
      this.hasErrors = false
    })
    try {
      const userId = await this.rootStore.userStore.user.id
      const response = await ChatService.getChats(userId)
      runInAction(() => {
        this.userId = userId
        this.chats = response.data.chats
        // this.chatList = this.getChatList
      })
    } catch (e) {
      console.log(e)
      runInAction(() => {
        this.hasErrors = true
      })
    } finally {
      runInAction(() => {
        this.loading = false
        console.log('loading ' + this.loading)
        // console.log(toJS(this.chats))
      })
    }
  }

  get getChatList () {
    const party = this.chats.map(chat => {
      return {
        id: chat._id,
        party: [chat.party]
      }
    })
    // console.log(toJS(party))
    return party.map(members => {
      // console.log(toJS(members.party))

      return members.party.map(item => {
        return item.filter(member => {
          // console.log(toJS(member))
          // console.log(member.id)
          // console.log(member.id !== userId)
          return member.id !== this.userId
        })
      })
    })
    // console.log(toJS(this.chatList))
  }

  setCurrentChatId (chatId) {
    this.currentChatId = chatId
  }

  getCurrentChat () {
    this.currentChat = this.chats.filter(chat => {
      console.log(toJS(chat))
      console.log(this.currentChatId)
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
