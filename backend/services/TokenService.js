const TokenModel = require('../models/TokenModel')
const jwt = require('jsonwebtoken')

class TokenService {
  generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})

    return {accessToken, refreshToken}
  }

  async saveToken(userId, refreshToken){
    const tokenData = await TokenModel.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({user: userId, refreshToken})

    return token
  }
}

module.exports = new TokenService()
