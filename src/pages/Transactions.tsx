import TransactionTable from '../components/TransactionTable'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/reducers/rootReducer'

export default function Transactions() {
  const transactions = useSelector((s: RootState) => s.wallet.transactions)
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Transactions</h1>
      <TransactionTable transactions={transactions} />
    </div>
  )
}
