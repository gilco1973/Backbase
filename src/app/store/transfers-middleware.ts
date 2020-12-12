import {NgRedux} from "@angular-redux/store";
import {TransfersActions, TransfersActionsService} from "./transfers-actions";
import {Dispatch} from "redux";
// import {ActionWithPayload, ITransaction, ITransactionsState} from "./model";
import {Subscription} from "rxjs";
import {TransfersService} from "./transfers.service";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
// import {transactionsReducer} from "./store/transfers-reducer";

@Injectable()
export class TransfersMiddleware {
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<any>, private transfersService: TransfersService, private transfersActions: TransfersActionsService) {
    // this.transactionsReducer$ = this.store.select('transactionsReducer');
  }

  // public call = (store: NgRedux<ITransactionsState>) => (next: Dispatch) => (action: ActionWithPayload) => {
  //   switch (action.type) {
  //     case TransfersActions.getTransactions: {
  //       this.subscriptions.push(
  //         this.transfersService.getTransactions().subscribe((data: ITransaction[]) => {
  //           data.forEach((transaction) => transaction._id = transaction.merchant.accountNumber);
  //           console.log(data);
  //           this.transfersActions.setTransactions(data);
  //         })
  //       );
  //       next(action);
  //       break;
  //     }
  //
  //     case TransfersActions.leave: {
  //       this.subscriptions.forEach(subscription => subscription.unsubscribe());
  //       next(action);
  //       break;
  //     }
  //
  //   }
  // }
}
