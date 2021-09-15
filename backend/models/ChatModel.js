const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
  title: { type: String, maxLength: 30, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  party: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
      name: {type: String, required: true},
      status: { type: String, match: /member|moderator|banned/, default: 'member' },
      chatStatus: {type: String, match: /active|deleted/, default: 'active'}
    }
  ],
  messages: [
    {
      author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
      name: {type: String, required: true},
      content: {type: String, maxLength: 255, required: true},
      createdAt: { type: Date, default: Date.now },
      status: { type: String, match: /new|deleted|read/, default: 'new' }
    }
  ],
  isDeleted: { type: Boolean, default: false }
})

module.exports = model('Chat', ChatSchema)
