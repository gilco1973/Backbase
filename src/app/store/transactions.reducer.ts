import {createReducer, on} from '@ngrx/store';
import {TransfersActions} from "./transfers-actions";

export interface ITransactionsState {
  transactions: Transaction[];
  availableBalance: number;
}

export const initialState = {
  transactions: null
}

export interface Transaction {
  categoryCode: string;
  dates: { valueDate: number };
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
    ...state,
    transactions: transactions
  })),
  on(TransfersActions.transfer, (state, {transaction}) => ({
    ...state,
    transactions: [transaction, ...state.transactions],
    availableBalance: state.availableBalance - transaction.transaction.amountCurrency.amount
  })),
);

export function transactionsReducer(state: ITransactionsState | undefined, action) {
  return _transactionsReducer(state, action);
}
