import { makeAutoObservable, runInAction, toJS, autorun } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
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
    return this.chats.map(chat => {
      return {
        id: chat._id,
        party: chat.party.filter(member => member.id !== this.userId)
      }
    })
    // console.log(toJS(party))
    // return party.map(members => {
    //   // console.log(toJS(members.party))
    //
    //   return members.party.map(item => {
    //
    //     return item.filter(member => {
    //       // console.log(toJS(member))
    //       // console.log(member.id)
    //       // console.log(member.id !== userId)
    //       return member.id !== this.userId
    //     })
    //   })
    // })
  }

  setCurrentChatId (chatId) {
    this.currentChatId = chatId
  }

  get getCurrentChatMessages () {
    return this.currentChatId !== ''
      ? this.chats.filter(chat => chat._id === this.currentChatId)[0].messages
      : []

    // return this.chats.filter(chat => {
    // console.log(toJS(chat))
    // console.log(this.currentChatId)
    // return chat._id === this.currentChatId
    // return chat._id === this.currentChatId
    // })
  }

  async addMessage (content, chatId = this.currentChatId) {
    try {
      const response = await ChatService.addMessage(content, chatId)
      console.log(response.data)

      runInAction(() => {
        this.chats = this.chats.map(chat => chat._id === chatId ? Object.assign({}, response.data) : chat)
          // if (chat._id === chatId) {
          //   console.log(chat)
          //   chat = response.data
          //   console.log(chat)
          // }
          // return chat._id === chatId ? Object.assign({}, response.data) : null

        console.log(toJS(this.chats))
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}
