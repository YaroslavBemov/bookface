const ApiError = require('../exceptions/ApiError')
const TokenService = require('../services/TokenService')

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(ApiError.unauthorizedError())
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.unauthorizedError())
    }

    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.unauthorizedError())
    }

    req.user = userData
    next()
  } catch (e) {
    throw ApiError.unauthorizedError()
  }
}
