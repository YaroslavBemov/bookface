import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { API_URL } from '../http'
import UserService from '../services/UserService'

export default class UserStore {
  user = {}
  isAuth = false
  isLoading = false
  isError = false
  rootStore

  constructor (rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async signUp (firstName, lastName, email, password) {
    this.setLoading(true)
    try {
      const response = await AuthService.signUp(firstName, lastName, email, password)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      this.setError(false)
    } catch (e) {
      this.setError(true)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async signIn (email, password) {
    this.setLoading(true)
    try {
      const response = await AuthService.signIn(email, password)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      this.setError(false)
    } catch (e) {
      this.setError(true)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async signOut () {
    this.setLoading(true)
    try {
      await AuthService.signOut()
      localStorage.removeItem('accessToken')
      this.setAuth(false)
      this.setUser({})
      this.setError(false)
    } catch (e) {
      this.setError(true)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async checkAuth () {
    this.setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      this.setError(false)
    } catch (e) {
      this.setError(true)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async updateProfile (values) {
    this.setLoading(true)
    try {
      const response = await UserService.updateProfile(values, this.user.id)
      this.setUser(response)
      this.setError(false)
    } catch (e) {
      this.setError(true)
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  setUser (user) {
    this.user = user
  }

  setAuth (bool) {
    this.isAuth = bool
  }

  setLoading (bool) {
    this.isLoading = bool
  }

  setError (bool) {
    this.isError = bool
  }
}
