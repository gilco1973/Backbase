import {createAction, props} from '@ngrx/store';
import {Transaction} from "./transactions.reducer";

export const TransfersActions = {
  'getTransactions': createAction('TransferActions -> getTransactions'),
  'setTransactions': createAction('TransferActions -> setTransactions', props<{ transactions: Transaction[] }>()),
  'transfer': createAction('TransferActions -> transfer', props<{ transaction: Transaction }>())
}
