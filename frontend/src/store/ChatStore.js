import { makeAutoObservable, runInAction, toJS } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
  noChats = false
  currentChatId = ''
  isLoading = false
  isErrors = false
  isFetched = false

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
        this.setIsFetched(true)
      }
    } catch (e) {
      console.log(e)
      this.setErrors(true)
    } finally {
      this.setLoading(false)
    }
  }

  async addChat (withId, withName, content) {
    console.log(withId, withName, content)
    this.setLoading(true)

    try {
      const response = await ChatService.addChat(withId, withName, content)
      runInAction(() => {this.chats.push(response)})
      this.setNoChats(false)
      this.setErrors(false)
    } catch (e) {
      console.log(e)
      this.setErrors(true)
    } finally {
      this.setLoading(false)
    }
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
    if (this.isChats) {
      const userId = this.rootStore.userStore.user.id
      return this.chats.map(chat => {
        return {
          id: chat._id,
          party: chat.party.filter(member => member.id !== userId)
        }
      })
    }
    return []
  }

  getChatIdWithUser (id) {
    const result = this.getChatList.map(chat => {
      return chat.party.find(el => el.id === id)
    })
    return result.length > 0 ? result : null
  }

  // return this.getChatList.map(chat => {
  //   console.log(id)
  //   console.log(toJS(chat))
  //
  //   return chat.party.find(id === chat.party.id)
  // })

  get isChats () {
    return this.chats.length > 0
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

  setIsFetched (bool) {
    this.isFetched = bool
  }
}
