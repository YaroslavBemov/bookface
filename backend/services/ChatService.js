const ChatModel = require('../models/ChatModel')

class ChatService {
  async getUserChats(userId) {
    const chats = await ChatModel.find({participants: userId})
    if (!chats) {
      return {message: 'No chats'}
    }

    return {chats}
  }
}

module.exports = new ChatService()
