import {NgRedux} from "@angular-redux/store";
import {TransfersActions, TransfersActionsService} from "./transfers-actions";
import {Dispatch} from "redux";
import {ActionWithPayload, ITransfersState} from "./model";
import {Subscription} from "rxjs";
import {TransfersService} from "./transfers.service";

export class TransfersMiddleware {
  private subscriptions: Subscription[] = [];

  constructor(private transfersService: TransfersService, private transfersActions: TransfersActionsService) {
  }

  public call = (store: NgRedux<ITransfersState>) => (next: Dispatch) => (action: ActionWithPayload) => {
    switch (action.type) {
      case TransfersActions.enter: {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());

        this.subscriptions.push(
          this.transfersService.getTransfers().subscribe((data: any[]) => {
            console.log(data);
          })
        );
        next(action);
        break;
      }

      case TransfersActions.getTransfers: {
        this.subscriptions.push(
          this.transfersService.getTransfers().subscribe((data: any[]) => {
            console.log(data);
          })
        );
        next(action);
        break;
      }

      case TransfersActions.leave: {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        next(action);
        break;
      }

    }
  }
}
