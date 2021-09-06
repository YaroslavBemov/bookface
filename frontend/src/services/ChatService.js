import $api from '../http'

export default class ChatService {
  static async getChats() {
    const response = await $api.get('/chats')
    return response.data.chats
  }

  static async addMessage(content, chatId) {
    return await $api.post(`/chats/${chatId}`, content)
  }

  static async addChat(withId, withName, content) {
    return await $api.post('/chats', {withId, withName, content})
  }
}
