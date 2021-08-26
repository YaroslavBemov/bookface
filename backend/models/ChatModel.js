const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
  title: { type: String, maxLength: 30 },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, match: 'moderator|banned' }
    }
  ],
  messages: [
    {
      author: { type: Schema.Types.ObjectId, ref: 'User' },
      content: {type: String, maxLength: 255},
      createdAt: { type: Date, default: Date.now },
      status: { type: String, match: 'new|deleted|read', default: 'new' }
    }
  ]
})

module.exports = model('Chat', ChatSchema)
