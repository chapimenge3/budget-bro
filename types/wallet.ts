export interface WalletType {
  id: number
  user_id: number | null
  name: string
  currency: string
  initial_balance: number
  current_balance: number
}
