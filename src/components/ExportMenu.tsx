import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

export type ExportRow = Record<string, any>

export function exportCSV(filename: string, rows: ExportRow[]) {
  const headers = Object.keys(rows[0] || {})
  const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))).join('\n')
  download(filename.endsWith('.csv') ? filename : filename + '.csv', csv, 'text/csv')
}

export function exportExcel(filename: string, rows: ExportRow[]) {
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
  XLSX.writeFile(wb, filename.endsWith('.xlsx') ? filename : filename + '.xlsx')
}

export function exportPDF(filename: string, rows: ExportRow[]) {
  const doc = new jsPDF()
  const headers = Object.keys(rows[0] || {})
  const data = rows.map(r => headers.map(h => String(r[h] ?? '')))
  autoTable(doc, { head: [headers], body: data, styles: { fontSize: 8 } })
  doc.save(filename.endsWith('.pdf') ? filename : filename + '.pdf')
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
