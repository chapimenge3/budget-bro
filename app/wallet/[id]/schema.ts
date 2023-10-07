import { z } from "zod"

export const TransactionListSchema = z.object({
  _id: z.string(),
  type: z.string(),
  amount: z.number(),
  note: z.string(),
  date: z.string(),
})

export type TransactionList = z.infer<typeof TransactionListSchema>
