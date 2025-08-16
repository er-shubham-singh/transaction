import type { Currency } from '../types'

export const RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.009,
}

export function convert(amount: number, from: Currency, to: Currency): number {
  const inInr = amount / RATES[from]
  return +(inInr * RATES[to]).toFixed(2)
}

export function format(amount: number, currency: Currency) {
  const symbols: Record<Currency, string> = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }
  return `${symbols[currency]}${amount.toFixed(2)}`
}

export const CURRENCIES: Currency[] = ['INR', 'USD', 'EUR', 'GBP']
