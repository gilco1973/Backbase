import {Injectable} from "@angular/core";
import {dispatch} from "@angular-redux/store";
import {ActionWithPayload, ITransfer} from "./model";

export const TransfersActions = {
  'enter': 'TransferActions -> enter',
  'leave': 'TransferActions -> leave',
  'transfer': 'TransferActions -> transfer',
  'getTransfers': 'TransferActions -> getTransfers'

}
@Injectable()
export class TransfersActionsService {

  @dispatch() enter(): ActionWithPayload {
    return {
      type: TransfersActions.enter
    };
  }

  @dispatch() getTransfers(): ActionWithPayload {
    return {
      type: TransfersActions.getTransfers
    };
  }

  @dispatch() leave(): ActionWithPayload {
    return {
      type: TransfersActions.leave
    };
  }

  @dispatch() transfer(transfer: ITransfer): ActionWithPayload {
    return {
      type: TransfersActions.enter,
      payload: transfer
    };
  }
}
