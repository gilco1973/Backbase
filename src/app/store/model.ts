import {Action} from "redux";
import {EntityState} from "./entity-state-utils";

export interface ITransfer {
  _id: string;
  toAccount: string;
  amount: number;
  date: Date;
}

export interface ActionWithPayload extends Action {
  payload?: any;
}

export interface ITransfersState {
  transfers?: EntityState<ITransfer>;
}

export interface ITransaction {
  categoryCode: string
  dates: { valueDate: string }
  merchant: { name: string, accountNumber: string }
  transaction: {
    amountCurrency: {
      amount: number,
      currencyCode: string
    }
    creditDebitIndicator: "CRDT"
    type: string
  }
}
