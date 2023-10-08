import mongoose from "mongoose"

export interface LabelDocument extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId | null
  name: string
}

const LabelSchema = new mongoose.Schema<LabelDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
})

export default mongoose.models.Label || mongoose.model<LabelDocument>("Label", LabelSchema)