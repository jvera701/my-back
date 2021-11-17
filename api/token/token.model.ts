import mongoose, { Schema } from 'mongoose'
export interface IToken {
  userId: mongoose.Schema.Types.ObjectId
  token: string
  createdAt: Date
}

const schema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
})

export default mongoose.model<IToken>('Token', schema, 'Token')
