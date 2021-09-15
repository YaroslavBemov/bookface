import $api from '../http'

export default class UserService {
  static async getUsers() {
    const response = await $api.get('/users')
    return response.data.users
  }

  static async getUser(id) {
    const response = await $api.get(`/users/${id}`)
    return response.data.user
  }

  static async updateProfile(values, id) {
    const response = await $api.patch(`/users/${id}`, values)
    return response.data.user
  }
}
