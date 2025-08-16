import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withdrawFunds } from '../store/actions/walletActions'

export default function Withdraw() {
  const [bank, setBank] = useState('');
  const [acc, setAcc] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [amount, setAmount] = useState(100);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    if (!bank || !acc || !ifsc || amount <= 0) {
      return;
    }

    dispatch(withdrawFunds(amount));
    setBank('');
    setAcc('');
    setIfsc('');
    setAmount(100);
    setSuccess(true);
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Withdraw Funds</h1>
        <p className="text-gray-400 text-sm mb-6">
          Transfer your funds to your bank account.
        </p>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Bank Name
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Account Number
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={acc}
              onChange={(e) => setAcc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              IFSC Code
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Amount (INR)
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
          {success && (
            <div className="bg-green-800 text-green-300 p-3 rounded-lg text-sm text-center font-medium">
              Withdrawal request submitted!
            </div>
          )}
          <button
            className="w-full px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors duration-200"
          >
            Withdraw
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            This is a dummy form for the assignment.
          </p>
        </form>
      </div>
    </div>
  );
}