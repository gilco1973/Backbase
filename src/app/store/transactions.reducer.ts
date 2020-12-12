import {createReducer, on} from '@ngrx/store';
import {TransfersActions} from "./transfers-actions";

export interface ITransactionsState {
  transactions: Transaction[];
}

export const initialState = {
  transactions: null
}

export interface Transaction {
  _id: string;
  categoryCode: string;
  dates: { valueDate: string };
  merchant: { name: string, accountNumber: string };
  transaction: {
    amountCurrency: {
      amount: number,
      currencyCode: string
    };
    creditDebitIndicator: string;
    type: string;
  }
}

const _transactionsReducer = createReducer(
  initialState,
  on(TransfersActions.getTransactions, (state) => state.transactions),
  on(TransfersActions.setTransactions, (state, {transactions}) => ({
    ...state.transactions,
    transactions: transactions
  })),
);

export function transactionsReducer(state: ITransactionsState | undefined, action) {
  return _transactionsReducer(state, action);
}
