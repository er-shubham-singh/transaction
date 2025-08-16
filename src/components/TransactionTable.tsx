import { useMemo, useState } from 'react'
import type { Transaction, TxType, TxStatus } from '../types'
import { exportCSV, exportExcel, exportPDF } from './ExportMenu'

type Props = { transactions: Transaction[] }

// export default function TransactionTable({ transactions }: Props) {
//   const [type, setType] = useState<'all' | TxType>('all')
//   const [status, setStatus] = useState<'all' | TxStatus>('all')
//   const [from, setFrom] = useState<string>('')
//   const [to, setTo] = useState<string>('')

//   const filtered = useMemo(() => {
//     const s = new Date(from).getTime()
//     const e = to ? new Date(to + 'T23:59:59').getTime() : Number.POSITIVE_INFINITY
//     return transactions.filter(tx => {
//       const t = new Date(tx.date).getTime()
//       return (type === 'all' || tx.type === type) &&
//              (status === 'all' || tx.status === status) &&
//              (!from || t >= s) && (!to || t <= e)
//     })
//   }, [transactions, type, status, from, to])

//   const rows = filtered.map(tx => ({
//     Date: new Date(tx.date).toLocaleString(),
//     Type: tx.type,
//     Status: tx.status,
//     Amount: tx.amount.toFixed(2),
//     Currency: tx.currency,
//     Details: tx.meta ? JSON.stringify(tx.meta) : ''
//   }))

//   return (
//     <div className="card p-4">
//       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
//         <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//           <div>
//             <label className="label">Type</label>
//             <select className="input" value={type} onChange={e => setType(e.target.value as any)}>
//               <option value="all">All</option>
//               <option value="add">Add</option>
//               <option value="withdraw">Withdraw</option>
//               <option value="exchange">Exchange</option>
//             </select>
//           </div>
//           <div>
//             <label className="label">Status</label>
//             <select className="input" value={status} onChange={e => setStatus(e.target.value as any)}>
//               <option value="all">All</option>
//               <option value="completed">Completed</option>
//               <option value="failed">Failed</option>
//             </select>
//           </div>
//           <div>
//             <label className="label">From</label>
//             <input className="input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
//           </div>
//           <div>
//             <label className="label">To</label>
//             <input className="input" type="date" value={to} onChange={e => setTo(e.target.value)} />
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button className="btn" onClick={() => exportCSV('transactions.csv', rows)}>CSV</button>
//           <button className="btn" onClick={() => exportExcel('transactions.xlsx', rows)}>Excel</button>
//           <button className="btn" onClick={() => exportPDF('transactions.pdf', rows)}>PDF</button>
//         </div>
//       </div>

//       <div className="mt-4 overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="py-2 pr-4">Date</th>
//               <th className="py-2 pr-4">Type</th>
//               <th className="py-2 pr-4">Status</th>
//               <th className="py-2 pr-4 text-right">Amount</th>
//               <th className="py-2 pr-4">Currency</th>
//               <th className="py-2 pr-4">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(tx => (
//               <tr key={tx.id} className="border-b last:border-0">
//                 <td className="py-2 pr-4">{new Date(tx.date).toLocaleString()}</td>
//                 <td className="py-2 pr-4 capitalize">{tx.type}</td>
//                 <td className="py-2 pr-4">
//                   <span className={`badge ${tx.status === 'completed' ? 'bg-green-50' : 'bg-red-50'}`}>{tx.status}</span>
//                 </td>
//                 <td className="py-2 pr-4 text-right">{tx.amount.toFixed(2)}</td>
//                 <td className="py-2 pr-4">{tx.currency}</td>
//                 <td className="py-2 pr-4">{tx.meta ? JSON.stringify(tx.meta) : '-'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {!filtered.length && <div className="text-center text-sm text-gray-500 py-8">No transactions</div>}
//       </div>
//     </div>
//   )
// }

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [type, setType] = useState<'all' | TxType>('all');
  const [status, setStatus] = useState<'all' | TxStatus>('all');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const filtered = useMemo(() => {
    const s = new Date(from).getTime();
    const e = to ? new Date(to + 'T23:59:59').getTime() : Number.POSITIVE_INFINITY;
    return transactions.filter((tx) => {
      const t = new Date(tx.date).getTime();
      return (
        (type === 'all' || tx.type === type) &&
        (status === 'all' || tx.status === status) &&
        (!from || t >= s) &&
        (!to || t <= e)
      );
    });
  }, [transactions, type, status, from, to]);

  const rows = filtered.map((tx) => ({
    Date: new Date(tx.date).toLocaleString(),
    Type: tx.type,
    Status: tx.status,
    Amount: tx.amount.toFixed(2),
    Currency: tx.currency,
    Details: tx.meta ? JSON.stringify(tx.meta) : '',
  }));

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Filter Group */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type</label>
            <select
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="add">Add</option>
              <option value="withdraw">Withdraw</option>
              <option value="exchange">Exchange</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <select
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">From</label>
            <input
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">To</label>
            <input
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-cyan-400 font-medium hover:bg-gray-600 transition-colors duration-200"
            onClick={() => exportCSV('transactions.csv', rows)}
          >
            CSV
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-cyan-400 font-medium hover:bg-gray-600 transition-colors duration-200"
            onClick={() => exportExcel('transactions.xlsx', rows)}
          >
            Excel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-cyan-400 font-medium hover:bg-gray-600 transition-colors duration-200"
            onClick={() => exportPDF('transactions.pdf', rows)}
          >
            PDF
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-700 text-gray-400">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4">Currency</th>
              <th className="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-700 last:border-0 hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="py-3 px-4">{new Date(tx.date).toLocaleString()}</td>
                <td className="py-3 px-4 capitalize">{tx.type}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      tx.status === 'completed' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">{tx.amount.toFixed(2)}</td>
                <td className="py-3 px-4">{tx.currency}</td>
                <td className="py-3 px-4">{tx.meta ? JSON.stringify(tx.meta) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <div className="text-center text-sm text-gray-500 py-8">No transactions found for the selected filters.</div>
        )}
      </div>
    </div>
  );
}