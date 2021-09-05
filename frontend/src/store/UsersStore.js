import { makeAutoObservable } from 'mobx'
import UserService from '../services/UserService'

export default class UsersStore {
  rootStore
  users = []
  user = {}
  isLoading = false
  isErrors = false

  constructor(rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getUsers() {
    this.setLoading(true)
    try {
      const response = await UserService.getUsers()
      this.setUsers(response)
      this.setErrors(false)
    } catch (e) {
      this.setErrors(e)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async getUser(id) {
    this.setLoading(true)
    try {
      const response = await UserService.getUser(id)
      this.setUser(response)
      this.setErrors(false)
    } catch (e) {
      this.setErrors(e)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  setUsers(users) {
    this.users = users
  }

  setUser(user) {
    this.user = user
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  setErrors(bool) {
    this.isErrors = bool
  }
}
