const UserModel = require('../models/UserModel')
const MailService = require('./MailService')
const TokenService = require('./TokenService')
const UserDTO = require('../dtos/UserDTO')
const ApiError = require('../exceptions/ApiError')

const bcrypt = require('bcrypt')
const uuid = require('uuid')

class UserService {
  async getAllUsers() {
    const data = await UserModel.find()
    const users = data.map(user => new UserDTO(user))

    return {users}
  }

  async signUp (firstName, lastName, email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.badRequest('Email exists.')
    }

    const passwordHash = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      activationLink
    })
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      user: userDto,
      ...tokens
    }
  }

  async signIn (email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.badRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.badRequest('Неверный пароль')
    }
    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return { user: userDto, ...tokens }
  }

  async signOut (refreshToken) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  async refresh (refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findRefreshToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async activate (activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.badRequest('Link is bad')
    }
    user.isActivated = true
    await user.save()
  }
}

module.exports = new UserService()
