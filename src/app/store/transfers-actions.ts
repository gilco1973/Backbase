import {Injectable} from "@angular/core";
import {dispatch} from "@angular-redux/store";
// import {ActionWithPayload, Transaction, ITransfer} from "./model";
import {createAction, props} from '@ngrx/store';
import {Transaction} from "./transactions.reducer";

export const TransfersActions = {
  'enter': 'TransferActions -> enter',
  'leave': 'TransferActions -> leave',
  'transfer': 'TransferActions -> transfer',
  'getTransactions': createAction('TransferActions -> getTransactions'),
  'setTransactions': createAction('TransferActions -> setTransactions', props<{ transactions: Transaction[] }>())
}
