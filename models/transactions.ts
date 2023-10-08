import mongoose from "mongoose"

export interface TransactionDocument extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId
  wallet_id: mongoose.Schema.Types.ObjectId
  category_id: mongoose.Schema.Types.ObjectId | null
  label_id: mongoose.Schema.Types.ObjectId | null
  note: string
  amount: number
  type: string
  created_at: Date
  updated_at: Date
  is_deleted: boolean
  deleted_at: Date
}

const TransactionSchema = new mongoose.Schema<TransactionDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  wallet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: [true, "Please provide a wallet"],
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  label_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
  },
  note: { type: String },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["income", "expense", "transfer"],
    required: true,
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
})

export default mongoose.models.Transaction ||
  mongoose.model<TransactionDocument>("Transaction", TransactionSchema)
