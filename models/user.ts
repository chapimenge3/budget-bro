import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  is_verified: boolean
  is_active: boolean
  created_at: Date
  updated_at: Date
  is_deleted: boolean
  deleted_at: Date
}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
})

export default mongoose.models.User ||
  mongoose.model<UserDocument>("User", UserSchema)
