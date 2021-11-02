import mongoose, { Schema } from 'mongoose'
export interface IComment {
  content: string
  isEdited: boolean
  score: number
  photos: Array<string>
  commentID: mongoose.Schema.Types.ObjectId | null
  courseID: mongoose.Schema.Types.ObjectId | null
}

const schema: Schema = new Schema(
  {
    content: { type: String, required: true },
    isEdited: { type: Boolean, required: true },
    score: { type: Number, required: true },
    category: [String],
    photos: [String],
    commentID: { type: mongoose.Schema.Types.ObjectId },
    courseID: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
)
export default mongoose.model<IComment>('Comment', schema, 'Comment')
