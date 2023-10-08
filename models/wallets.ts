import mongoose from "mongoose"

export interface WalletDocument extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId | null
  name: string
  initial_balance: number
  current_balance: number
  currency: string
  created_at: Date
  updated_at: Date
  is_deleted: boolean
  deleted_at: Date
}

const WalletSchema = new mongoose.Schema<WalletDocument>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  initial_balance: { type: Number, required: true },
  current_balance: { type: Number, required: true },
  currency: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
})

export default mongoose.models.Wallet ||
  mongoose.model<WalletDocument>("Wallet", WalletSchema)
