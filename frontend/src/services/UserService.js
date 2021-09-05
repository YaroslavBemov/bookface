import $api from '../http'

export default class UserService {
  static async getUsers() {
    const response = await $api.get('/users')
    return response.data.users
  }

  static async getUser(id) {
    const response = await $api.get(`/users/${id}`)
    console.log(response.data.user)
    return response.data.user
  }
}
