const Router = require('express').Router
const { body } = require('express-validator')

const ArticleController = require('../controllers/ArticleController')
const UserController = require('../controllers/UserController')
const ChatController = require('../controllers/ChatController')

const authMiddleware = require('../middleware/AuthMiddleware')

const router = new Router()

router.post('/signup',
  body('name').isString().isLength({min: 1, max: 32}),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.signUp)

router.post('/signin',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.signIn)

router.post('/signout', UserController.signOut)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

router.get('/users', authMiddleware, UserController.index)

router.get('/articles', authMiddleware, ArticleController.index)

router.get('/chats', authMiddleware, ChatController.index)
router.post('/chats', authMiddleware, ChatController.storeChat)
router.post('/chats/:id', authMiddleware, ChatController.storeMessage)

module.exports = router
