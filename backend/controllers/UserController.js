const UserService = require('../services/UserService')
const ApiError = require('../exceptions/ApiError')
const {validationResult} = require('express-validator')

class UserController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()))
      }
      const {email, password} = req.body
      const userData = await UserService.signUp(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async signIn(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()))
      }
      const {email, password} = req.body
      const userData = await UserService.signIn(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async signOut(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await UserService.signOut(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await UserService.activate(activationLink)

      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await UserService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
