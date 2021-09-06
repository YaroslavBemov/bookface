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

  async storeChat (req, res, next) {
    try {
      const {withId, withName, content} = req.body
      const fromId = req.user.id
      const fromName= req.user.firstName + ' ' + req.user.lastName
      const chat = await ChatService.storeChat(fromId, fromName, withId, withName, content)

      return res.json(chat)
    } catch (e) {
      next(e)
    }
  }

  async storeMessage(req, res, next) {
    try {
      const chatId = req.params.id
      const {content} = req.body
      const {id, name} = req.user

      const chat = await ChatService.storeMessage(content, chatId, id, name)

      return res.json(chat)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new ChatController()
