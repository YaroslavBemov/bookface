import $api from '../http'

export default class AuthService {
  static async signUp(name, email, password) {
    const response = await $api.post('/signup', {name, email, password})
    console.log(response)
    return response
  }

  static async signIn(email, password) {
    return $api.post('/signin', {email, password})
  }

  static async signOut() {
    return $api.post('/signout')
  }
}
