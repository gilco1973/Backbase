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




