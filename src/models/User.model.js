import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema
import bcrypt from 'bcryptjs'
const UserSchema = new Schema({
  userName: { type: String, default: 'hahaha', index: true },
  email: { type: String, index: true },
  password: { type: String },
  dateRegistered: { type: Date, default: Date.now },
  lastSeen: { type: Date },
  contacts: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
})

// middleware
UserSchema.pre('save', function (next) {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

export const User = mongoose.model('User', UserSchema)
