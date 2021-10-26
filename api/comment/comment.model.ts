import mongoose, {Schema } from 'mongoose';
export interface IComment{
  content: String
  isEdited: Boolean
  score: Number
  category: Array<String>
  photos: Array<String>
  commentID: mongoose.Schema.Types.ObjectId
  courseID: mongoose.Schema.Types.ObjectId
}


const schema: Schema = new Schema({
   content: {type: String, required: true},
   isEdited: {type: Boolean, required: true},
   score: {type: Number, required: true},
   category: [String],
   photos: [String],
   commentID: {type: mongoose.Schema.Types.ObjectId},
   courseID: {type: mongoose.Schema.Types.ObjectId},
  },
  {
    timestamps: true,
  });
  
export default mongoose.model<IComment>("Comment", schema, "Comment");