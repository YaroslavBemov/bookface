import { makeAutoObservable } from 'mobx'
import UserService from '../services/UserService'

export default class UsersStore {
  rootStore
  users = []
  user = {}
  noUsers = false
  isLoading = false
  isError = false

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getUsers () {
    this.setLoading(true)
    try {
      const response = await UserService.getUsers()
      if (response === 'No users') {
        this.setNoUsers(true)
      } else {
        this.setUsers(response)
        this.setNoUsers(false)
        this.setError(false)
      }
    } catch (e) {
      this.setError(e)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async getUser (id) {
    this.setLoading(true)
    try {
      const response = await UserService.getUser(id)
      this.setUser(response)
      this.setError(false)
    } catch (e) {
      this.setError(e)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  get getUsersList () {
    const userId = this.rootStore.userStore.user.id
    return this.users.filter(user => user.id !== userId)
  }

  setUsers (users) {
    this.users = users
  }

  setUser (user) {
    this.user = user
  }

  setLoading (bool) {
    this.isLoading = bool
  }

  setError (bool) {
    this.isError = bool
  }

  setNoUsers (bool) {
    this.noUsers = bool
  }
}
