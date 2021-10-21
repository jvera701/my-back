import mongoose, {Schema } from 'mongoose';
export interface IUser{
  email: String;
  password: String;
  name: String;
  role: String;
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name: { type: String, required: true},
  role: { type: String, required: true},
});

export default mongoose.model<IUser>("User", schema, "User");