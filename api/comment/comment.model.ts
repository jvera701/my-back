import mongoose, { Schema } from 'mongoose'
export interface IComment {
  content: string
  isEdited: boolean
  score: number
  photos: Array<string>
  threadId: mongoose.Schema.Types.ObjectId | null
  userId: mongoose.Schema.Types.ObjectId
  comments: Array<mongoose.Schema.Types.ObjectId>
}

const schema: Schema = new Schema(
  {
    content: { type: String, required: true },
    isEdited: { type: Boolean, required: true },
    score: { type: Number, required: true },
    photos: { type: [String], required: true },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Comment',
    },
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
export default mongoose.model<IComment>('Comment', schema, 'Comment')
