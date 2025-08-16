import { CURRENCIES, format } from '../utils/currency'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/reducers/rootReducer'
import type { Currency } from '../types'

export default function BalanceCard() {
  const balances = useSelector((s: RootState) => s.wallet.balances);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Wallet Balance</h2>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-600 text-white">
          LocalStorage
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {CURRENCIES.map((c) => (
          <div
            key={c}
            className="rounded-xl border border-gray-700 p-4 bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
          >
            <div className="text-sm text-gray-400">{c}</div>
            <div className="text-xl font-bold mt-1 text-white">
              {format(balances[c as Currency], c as Currency)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
