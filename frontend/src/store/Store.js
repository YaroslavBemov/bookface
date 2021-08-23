import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'

export default class Store {
  user = {}
  isAuth = false

  constructor () {
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setUser(user) {
    this.user = user
  }

  async signUp(email, password) {
    try {
      const response = await AuthService.signUp(email, password)
      console.log(response)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async signIn(email, password) {
    try {
      const response = await AuthService.signIn(email, password)
      console.log(response)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async signOut(email, password) {
    try {
      const response = await AuthService.signOut()
      localStorage.removeItem('accessToken')
      this.setAuth(false)
      this.setUser({})
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
}
