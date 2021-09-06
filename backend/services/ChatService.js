const ChatModel = require('../models/ChatModel')

class ChatService {
  async getUserChats (userId) {
    const chats = await ChatModel.find({ 'party.id': userId })
    if (+chats.length === 0) {
      return { chats: 'No chats' }
    }

    return { chats }
  }

  async storeChat (fromId, fromName, withId, withName, content) {

    const chat = await ChatModel.create({
      owner: fromId,
      party: [{ id: fromId, name: fromName }, { id: withId, name: withName }],
      messages: [{ author: fromId, name: fromName, content }]
    })

    return { chat }
  }

  async storeMessage (content, chatId, id, name) {
    const filter = { _id: chatId }
    const update = {
        author: id,
        name,
        content
    }
    const chat = await ChatModel.findOne(filter)
    chat.messages.push(update)
    await chat.save()
    return chat
  }
}

module.exports = new ChatService()
