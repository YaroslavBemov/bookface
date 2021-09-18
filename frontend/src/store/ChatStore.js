import { makeAutoObservable, runInAction } from 'mobx'
import ChatService from '../services/ChatService'

export default class ChatStore {
  rootStore
  chats = []
  noChats = false
  currentChatId = ''
  isLoading = false
  isError = false
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
        this.setError(false)
        this.setIsFetched(true)
      }
    } catch (e) {
      console.log(e)
      this.setError(true)
    } finally {
      this.setLoading(false)
    }
  }

  async addChat (withId, withName, content) {
    this.setLoading(true)

    try {
      const response = await ChatService.addChat(withId, withName, content)
      runInAction(() => {this.chats.push(response)})
      this.setNoChats(false)
      this.setError(false)
    } catch (e) {
      console.log(e)
      this.setError(true)
    } finally {
      this.setLoading(false)
    }
  }

  async addMessage (content, chatId = this.currentChatId) {
    try {
      const response = await ChatService.addMessage(content, chatId)
      runInAction(() => {
        this.chats = this.chats.map(chat => chat._id === chatId ? Object.assign({}, response.data) : chat)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  getChatIdWithUser (id) {
    const result = this.getChatList.map(chat => {
      return chat.party.find(el => el.id === id)
    })
    return result.length > 0 ? result[0].id : null
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

  get isChats () {
    return this.chats.length > 0
  }

  get getCurrentChatMessages () {
    const result = this.currentChatId !== ''
      ? this.chats.filter(chat => chat._id === this.currentChatId)
      : []
    if (result.length > 0) {
      return result[0].messages
    }
    console.log(result)
    return result
  }

  setCurrentChatId (id) {
    this.currentChatId = id
  }

  setLoading (bool) {
    this.isLoading = bool
  }

  setError (bool) {
    this.isError = bool
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
