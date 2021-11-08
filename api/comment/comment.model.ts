import mongoose, { Schema } from 'mongoose'
export interface IComment {
  content: string
  isEdited: boolean
  score: number
  photos: Array<string>
  commentId: mongoose.Schema.Types.ObjectId | null
  threadId: mongoose.Schema.Types.ObjectId | null
  userId: mongoose.Schema.Types.ObjectId
}

const schema: Schema = new Schema(
  {
    content: { type: String, required: true },
    isEdited: { type: Boolean, required: true },
    score: { type: Number, required: true },
    category: [String],
    photos: [String],
    commentId: { type: mongoose.Schema.Types.ObjectId },
    threadId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
)
export default mongoose.model<IComment>('Comment', schema, 'Comment')
