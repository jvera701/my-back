import mongoose, { Schema } from 'mongoose'
export interface IThread {
  title: string
  content: string
  pinned: boolean
  score: number
  replies: number
  category: string
  photos: Array<string>
  courseId: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
}

const schema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pinned: { type: Boolean, required: true },
    score: { type: Number, required: true },
    replies: { type: Number, required: true },
    category: { type: String, required: true },
    photos: [String],
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
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
export default mongoose.model<IThread>('Thread', schema, 'Thread')
