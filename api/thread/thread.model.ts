import mongoose, { Schema } from 'mongoose'
export interface IThread {
  title: string
  content: string
  pinned: boolean
  isEdited: boolean
  score: number
  category: Array<string>
  photos: Array<string>
  courseID: mongoose.Schema.Types.ObjectId
}

const schema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pinned: { type: Boolean, required: true },
    isEdited: { type: Boolean, required: true },
    score: { type: Number, required: true },
    category: [String],
    photos: [String],
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
)
export default mongoose.model<IThread>('Thread', schema, 'Thread')