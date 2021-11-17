import mongoose, { Schema } from 'mongoose'

export interface IComment {
  content: string
  score: number
  photos: Array<string>
  threadId: mongoose.Schema.Types.ObjectId | null
  userId: mongoose.Schema.Types.ObjectId
  comments: Array<mongoose.Schema.Types.ObjectId>
  isEdited: boolean
}

const schema: Schema = new Schema(
  {
    content: { type: String, required: true },
    score: { type: Number, required: true },
    photos: [{ type: String, required: true }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment',
      },
    ],
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isEdited: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IComment>('Comment', schema, 'Comment')
