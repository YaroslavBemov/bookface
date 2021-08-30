import $api from '../http'

export default class ChatService {
  static async getChats(userId) {
    return await $api.get('/chats')
  }
}
