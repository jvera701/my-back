import mongoose, {Schema } from 'mongoose';
export interface IUser{
  email: String
  password: String
  name: String
  role: String
  courses : Array<mongoose.Schema.Types.ObjectId>
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name: { type: String, required: true},
  role: { type: String, required: true},
  courses : [mongoose.Schema.Types.ObjectId]
});

export default mongoose.model<IUser>("User", schema, "User");