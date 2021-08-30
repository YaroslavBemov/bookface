const ChatModel = require('../models/ChatModel')

class ChatService {
  async getUserChats(userId) {
    const chats = await ChatModel.find({'party.id': userId})
    if (+chats.length === 0) {
      return {message: 'No chats'}
    }

    return {chats}
  }

  async storeChat(fromId, fromName, toId, toName, content) {

    const chat = await ChatModel.create({
      owner: fromId,
      party: [{id: fromId, name: fromName}, {id: toId, name: toName}],
      messages: [{author: fromId, name: fromName, content}]
    })

    return {chat}
  }
}

module.exports = new ChatService()
