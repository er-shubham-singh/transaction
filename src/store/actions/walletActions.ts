import {
  LOGIN, LOGOUT, ADD_FUNDS, WITHDRAW_FUNDS,
  EXCHANGE_FUNDS, CLEAR_ALL
} from '../types/walletTypes';
import type { Currency } from '../../types';

export const login = (phone: string) => ({
  type: LOGIN,
  payload: { phone }
});

export const logout = () => ({ type: LOGOUT } as const);

export const addFunds = (amount: number, currency: Currency) => ({
  type: ADD_FUNDS,
  payload: { amount, currency }
});

export const withdrawFunds = (amount: number) => ({
  type: WITHDRAW_FUNDS,
  payload: { amount }
});

export const exchangeFunds = (
  from: Currency, to: Currency, amount: number, convertedAmount: number
) => ({
  type: EXCHANGE_FUNDS,
  payload: { from, to, amount, convertedAmount }
});

export const clearAll = () => ({ type: CLEAR_ALL } as const);
