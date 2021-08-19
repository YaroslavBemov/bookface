const UserModel = require('../models/UserModel')
const MailService = require('./MailService')
const TokenService = require('./TokenService')
const UserDTO = require('../dtos/UserDTO')

const bcrypt = require('bcrypt')
const uuid = require('uuid')

class UserService {
  async signUp (email, password) {
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      throw new Error('Email exists.')
    }

    const passwordHash = bcrypt.hash(password, 3)
    const user = await UserModel.create({email, password: passwordHash})

    const activationLink = uuid.v4()
    await MailService.sendActivationMail(email, activationLink)

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      user: userDto,
      ...tokens
    }
  }
}

module.exports = new UserService()
