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

  async show(req, res, next) {
    try {
      const id = req.params.id
      const user = await UserService.getUser(id)
      if (!user) {
        return res.json('No user')
      }
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id
      const values = req.body
      const user = await UserService.updateUser(values, id)
      if (!user) {
        return res.json('No user')
      }

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
