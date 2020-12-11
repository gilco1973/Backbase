import {ITransfer, ITransfersState} from "./model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {NgRedux} from "@angular-redux/store";
import {getAll} from "./entity-state-utils";

export class TransfersSelectors {
  constructor(private store: NgRedux<ITransfersState>) {

  }
  getState = (): Observable<ITransfersState> => this.store.select(['transfers']);

  getTransfers = (): Observable<ITransfer[]> => getAll(this.getState().pipe(map((state: ITransfersState) => state.transfers)));
}
