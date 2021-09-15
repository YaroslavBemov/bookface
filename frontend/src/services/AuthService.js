import $api from '../http'

export default class AuthService {
  static async signUp(firstName, lastName, email, password) {
    return  await $api.post('/signup', {firstName, lastName, email, password})
  }

  static async signIn(email, password) {
    return $api.post('/signin', {email, password})
  }

  static async signOut() {
    return $api.post('/signout')
  }
}
