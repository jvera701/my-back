import mongoose, {Schema } from 'mongoose';

export interface ICourse{
    code: String
    name: String
    institution: String
    period: Number
    files: Array<String>
  }

const schema: Schema = new Schema({
    code: { type: String, required: true},
    name: { type: String, required: true},
    institution: { type: String, required: true},
    period: { type: Number, required: true},
    files: [String],
  });
  
export default mongoose.model<ICourse>("Course", schema, "Course");