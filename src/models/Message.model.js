import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema
const MessageSchema = new Schema({
  senderId: {
    type: ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: ObjectId,
    ref: 'User',
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  text: String,
  read: { type: Boolean, default: false },
  readAt: Date,
})

// middleware

export const Message = mongoose.model('Message', MessageSchema)
