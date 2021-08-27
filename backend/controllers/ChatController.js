const ChatService = require('../services/ChatService')

class ChatController {
  async index (req, res, next) {
    try {
      const userId = req.user.id
      const chats = await ChatService.getUserChats(userId)

      return res.json(chats)
    } catch (e) {
      next(e)
    }
  }

  async store (req, res, next) {
    try {
      const {toId, toName, content} = req.body
      const fromId = req.user.id
      const fromName= req.user.name
      const chat = await ChatService.storeChat(fromId, fromName, toId, toName, content)

      return res.json(chat)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new ChatController()
