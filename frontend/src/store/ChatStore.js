import { makeAutoObservable, runInAction } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
  noChats = false
  currentChatId = ''
  isLoading = false
  isErrors = false

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getChats () {
    this.setLoading(true)

    try {
      const response = await ChatService.getChats()
      if (response === 'No chats') {
        this.setNoChats(true)
      } else {
        this.setChats(response)
        this.setNoChats(false)
        this.setErrors(false)
      }
    } catch (e) {
      console.log(e)
      this.setErrors(true)
    } finally {
      this.setLoading(false)
    }
  }

  addChat(withId, withName, content) {
    console.log(withId, withName, content)
    //проверить есть ли уже такой чат
    //если есть, редирект на чат
    //если нет, добавить чат в список и редирект на чат

  }

  async addMessage (content, chatId = this.currentChatId) {
    try {
      const response = await ChatService.addMessage(content, chatId)

      runInAction(() => {
        this.chats = this.chats.map(chat => chat._id === chatId ? Object.assign({}, response.data) : chat)
        // if (chat._id === chatId) {
        //   console.log(chat)
        //   chat = response.data
        //   console.log(chat)
        // }
        // return chat._id === chatId ? Object.assign({}, response.data) : null

      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  get getChatList () {
    const userId = this.rootStore.userStore.user.id
    return this.chats.map(chat => {
      return {
        id: chat._id,
        party: chat.party.filter(member => member.id !== userId)
      }
    })
  }

  get getCurrentChatMessages () {
    return this.currentChatId !== ''
      ? this.chats.filter(chat => chat._id === this.currentChatId)[0].messages
      : []

    // return this.chats.filter(chat => {
    // return chat._id === this.currentChatId
    // return chat._id === this.currentChatId
    // })
  }


  setCurrentChatId (id) {
    this.currentChatId = id
  }

  setLoading (bool) {
    this.isLoading = bool
  }

  setErrors (bool) {
    this.isErrors = bool
  }

  setChats (chats) {
    this.chats = chats
  }

  setNoChats (bool) {
    this.noChats = bool
  }
}
