const Router = require('express').Router
const {body} = require('express-validator')

const articleController = require('../controllers/ArticleController')
const userController = require('../controllers/UserController')

const router = new Router()

router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.signUp)
router.post('/signin', userController.signIn)
router.post('/signout', userController.signOut)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

router.get('/articles', articleController.index)

module.exports = router
