import mongoose, { Schema } from 'mongoose'

export interface ICourse {
  code: string
  name: string
  institution: string
  period: number
  files: Array<string>
}

const schema: Schema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: Number, required: true },
  files: [String],
})
export default mongoose.model<ICourse>('Course', schema, 'Course')
