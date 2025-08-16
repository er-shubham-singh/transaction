import {
  LOGIN, LOGOUT, ADD_FUNDS, WITHDRAW_FUNDS,
  EXCHANGE_FUNDS, CLEAR_ALL
} from '../types/walletTypes';
import type { Transaction, Currency, Session } from '../../types';
import { nanoid } from '../../vendor/nanoid';
import { load, save } from '../../utils/storage';

export interface WalletState {
  session: Session | null;
  balances: Record<Currency, number>;
  transactions: Transaction[];
}

const initialState: WalletState = {
  session: load('session', null),
  balances: load('balances', { INR: 1000, USD: 0, EUR: 0, GBP: 0 }),
  transactions: load('transactions', [])
};

export const walletReducer = (state: WalletState = initialState, action: any): WalletState => {
  switch (action.type) {
    case LOGIN: {
      const session: Session = { phone: action.payload.phone };
      save('session', session);
      return { ...state, session };
    }
    case LOGOUT: {
      save('session', null);
      return { ...state, session: null };
    }
    case ADD_FUNDS: {
      const { amount, currency } = action.payload as { amount: number; currency: Currency };
      const balances = { ...state.balances, [currency]: state.balances[currency] + amount };
      const tx: Transaction = {
        id: nanoid(),
        date: new Date().toISOString(),
        type: 'add',
        status: 'completed',
        amount,
        currency
      };
      const transactions = [tx, ...state.transactions];
      save('balances', balances); save('transactions', transactions);
      return { ...state, balances, transactions };
    }
    case WITHDRAW_FUNDS: {
      const { amount } = action.payload as { amount: number };
      const balances = { ...state.balances };
      let tx: Transaction;
      if (balances.INR < amount) {
        tx = {
          id: nanoid(),
          date: new Date().toISOString(),
          type: 'withdraw',
          status: 'failed',
          amount,
          currency: 'INR',
          meta: { reason: 'Insufficient INR balance' }
        };
      } else {
        balances.INR -= amount;
        tx = {
          id: nanoid(),
          date: new Date().toISOString(),
          type: 'withdraw',
          status: 'completed',
          amount,
          currency: 'INR'
        };
        save('balances', balances);
      }
      const transactions = [tx, ...state.transactions];
      save('transactions', transactions);
      return { ...state, balances, transactions };
    }
    case EXCHANGE_FUNDS: {
      const { from, to, amount, convertedAmount } = action.payload as
        { from: Currency; to: Currency; amount: number; convertedAmount: number };
      const balances = { ...state.balances };
      let tx: Transaction;
      if (balances[from] < amount) {
        tx = {
          id: nanoid(),
          date: new Date().toISOString(),
          type: 'exchange',
          status: 'failed',
          amount,
          currency: from,
          meta: { reason: 'Insufficient funds', to }
        };
      } else {
        balances[from] -= amount;
        balances[to] += convertedAmount;
        tx = {
          id: nanoid(),
          date: new Date().toISOString(),
          type: 'exchange',
          status: 'completed',
          amount,
          currency: from,
          meta: { to, received: convertedAmount }
        };
        save('balances', balances);
      }
      const transactions = [tx, ...state.transactions];
      save('transactions', transactions);
      return { ...state, balances, transactions };
    }
    case CLEAR_ALL: {
      const reset = { INR: 1000, USD: 0, EUR: 0, GBP: 0 } as Record<Currency, number>;
      save('balances', reset); save('transactions', []);
      return { ...state, balances: reset, transactions: [] };
    }
    default:
      return state;
  }
};
