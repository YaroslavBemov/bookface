const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  activationLink: {type: String},
  isActivated: {type: Boolean, default: false}
})

module.exports = model('User', UserSchema)
