import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CURRENCIES, convert } from '../utils/currency'
import type { Currency } from '../types'
import { addFunds, exchangeFunds } from '../store/actions/walletActions'

export default function Actions() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState<Currency>('INR');

  const [from, setFrom] = useState<Currency>('INR');
  const [to, setTo] = useState<Currency>('USD');
  const [exAmount, setExAmount] = useState(100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Add Funds Card */}
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 className="font-bold text-xl mb-4">Add Funds</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Amount
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Currency
            </label>
            <select
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-200"
            onClick={() => dispatch(addFunds(amount, currency))}
          >
            Add
          </button>
        </div>
      </div>

      {/* Exchange Currency Card */}
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:col-span-2">
        <h3 className="font-bold text-xl mb-4">Exchange Currency</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              From
            </label>
            <select
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={from}
              onChange={(e) => setFrom(e.target.value as Currency)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              To
            </label>
            <select
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={to}
              onChange={(e) => setTo(e.target.value as Currency)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Amount
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="number"
              min={1}
              value={exAmount}
              onChange={(e) => setExAmount(+e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <span>You'll receive approximately:</span>
          <span className="font-semibold text-white">
            {convert(exAmount, from, to)} {to}
          </span>
        </div>
        <button
          className="w-full mt-4 px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors duration-200"
          onClick={() =>
            dispatch(exchangeFunds(from, to, exAmount, convert(exAmount, from, to)))
          }
        >
          Exchange
        </button>
      </div>
    </div>
  );
}
