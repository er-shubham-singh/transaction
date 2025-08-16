import BalanceCard from '../components/BalanceCard'
import Actions from '../components/Actions'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/reducers/rootReducer'
import TransactionTable from '../components/TransactionTable'

export default function Dashboard() {
  const transactions = useSelector((s: RootState) => s.wallet.transactions);
  const recent = transactions.slice(0, 5);

  return (
    <div className="space-y-8">
      <BalanceCard />
      <Actions />
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Recent Transactions</h2>
        <TransactionTable transactions={recent} />
      </div>
    </div>
  );
}
