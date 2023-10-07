import mongoose from "mongoose"

;`- id: int
- user_id: int
- wallet_id: int
- category_id: int [ => Foreign Key to Categories Table]
- date: datetime
- note: string (255) (nullable)
- amount: float
- type: string (enum: income, expense and transfer)
- label_id: int (nullable) [ => Foreign Key to Labels Table]
- created_at: datetime
- updated_at: datetime
- is_deleted: boolean
- deleted_at: datetime
`

export interface TransactionDocument extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId
  wallet_id: mongoose.Schema.Types.ObjectId
  category_id: mongoose.Schema.Types.ObjectId
  label_id: mongoose.Schema.Types.ObjectId | null
  date: Date
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
    required: [true, "Please provide a category"],
  },
  label_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
  },
  date: { type: Date, required: true },
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
