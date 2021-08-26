const ChatService = require('../services/ChatService')

class ChatController {
  async index (req, res, next) {
    try {
      const userId = req.user._id
      const chats = await ChatService.getUserChats(userId)

      return res.json(chats)
    } catch (e) {
      console.log(e)
    }
  }
}
