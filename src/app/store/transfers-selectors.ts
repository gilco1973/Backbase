// import {ITransaction, ITransfer, ITransactionsState} from "./model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {NgRedux} from "@angular-redux/store";
import {getAll} from "./entity-state-utils";
import {Injectable} from "@angular/core";
import {createSelector} from "@ngrx/store";
import {ITransactionsState, Transaction} from "./transactions.reducer";

@Injectable()
export class TransfersSelectors {
  constructor(private store: NgRedux<ITransactionsState>) {

  }
  getState = (): ITransactionsState => this.store.getState();

  // getTransactions = (): Observable<ITransaction[]> => getAll(this.getState().transactions);

}
// export interface FeatureState {
//   transactions: Transaction[];
// }



export const getTransactions = (state: ITransactionsState) => state.transactions;
// export const selectFeatureCount = createSelector(
//   selectFeature,
//   (state: FeatureState) => state.transactions
// );
