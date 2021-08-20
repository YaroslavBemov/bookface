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

    const passwordHash = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserModel.create({email, password: passwordHash, activationLink})
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      user: userDto,
      ...tokens
    }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})
    if (!user) {
      throw new Error('Link is bad')
    }
    user.isActivated = true
    await user.save()
  }
}

module.exports = new UserService()
