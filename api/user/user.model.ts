import mongoose, { Schema } from 'mongoose'
export interface IUser {
  email: string
  password: string
  name: string
  role: string
  courses: Array<mongoose.Schema.Types.ObjectId>
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
})

export default mongoose.model<IUser>('User', schema, 'User')
