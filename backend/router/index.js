const Router = require('express').Router
const { body } = require('express-validator')

const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')
const ArticleController = require('../controllers/ArticleController')
const ChatController = require('../controllers/ChatController')

const authMiddleware = require('../middleware/AuthMiddleware')

const router = new Router()

router.post('/signup',
  body('firstName').isString().isLength({min: 1, max: 32}),
  body('lastName').isString().isLength({min: 1, max: 32}),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  AuthController.signUp)

router.post('/signin',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  AuthController.signIn)

router.post('/signout', AuthController.signOut)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)

router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.patch('/users/:id', UserController.update)

router.get('/articles', authMiddleware, ArticleController.index)

router.get('/chats', authMiddleware, ChatController.index)
router.post('/chats', authMiddleware, ChatController.storeChat)
router.post('/chats/:id', authMiddleware, ChatController.storeMessage)

module.exports = router
