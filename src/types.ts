export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export type TxType = 'add' | 'withdraw' | 'exchange'
export type TxStatus = 'completed' | 'failed'

export interface Transaction {
  id: string
  date: string // ISO
  type: TxType
  status: TxStatus
  amount: number
  currency: Currency
  meta?: Record<string, any>
}

export interface Session {
  phone: string
}
