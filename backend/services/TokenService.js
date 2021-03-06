const TokenModel = require('../models/TokenModel')
const jwt = require('jsonwebtoken')

class TokenService {
  generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10d'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

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

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({refreshToken})

    return tokenData
  }

  async findRefreshToken(refreshToken) {
    const tokenData = await TokenModel.findOne({refreshToken})
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService()
