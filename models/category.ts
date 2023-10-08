import mongoose from "mongoose"

export interface CategoryDocument extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId | null
  name: string
  color: string
  icon: string
  created_at: Date
  updated_at: Date
  is_deleted: boolean
  deleted_at: Date
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  color: { type: String },
  icon: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
})

export default mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema)
