const UserService = require('../services/UserService')

class UserController {
  async index(req, res, next) {
    try {
      const users = await UserService.getAllUsers()
      if (!users) {
        return res.json('No users')
      }

      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
