# Wallet App (React + TypeScript + Tailwind + **Redux**)

A client-only wallet demo using classic Redux (action → action type → reducer → root reducer). Features:
- Mobile+OTP auth (dummy `1234`)
- Wallet dashboard with multi-currency balances (default INR ₹1000)
- Add funds, Withdraw (dummy bank form), Exchange with fixed rates
- Transactions with filters (date/type/status) + export CSV/Excel/PDF
- Persistence via LocalStorage

## State Architecture (Redux)
```
src/store/
  actions/
    walletActions.ts
  reducers/
    walletReducer.ts
    rootReducer.ts
  types/
    walletTypes.ts
  store.ts
```
- Action Types: `LOGIN`, `LOGOUT`, `ADD_FUNDS`, `WITHDRAW_FUNDS`, `EXCHANGE_FUNDS`, `CLEAR_ALL`
- Root reducer combines `wallet` slice.
- LocalStorage writes occur inside reducer branches to keep a single source of truth for persistence in this simple demo.

## Fixed Exchange Rates
```
INR 1 = USD 0.012
INR 1 = EUR 0.011
INR 1 = GBP 0.009
```

## Run
```bash
npm i
npm run dev
# or use yarn / pnpm
```

MIT (for evaluation).
