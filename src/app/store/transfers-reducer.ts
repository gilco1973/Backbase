import {ActionWithPayload, ITransfersState} from "./model";
import {TransfersActions} from "./transfers-actions";
import {upsertOne} from "./entity-state-utils";

const initialState: ITransfersState = {
  transfers: {
    entities: {},
    ids: []
  },
}

export function TransfersReducer(state: ITransfersState = initialState, action: ActionWithPayload) {
  switch (action.type) {
    case TransfersActions.enter: {
      return {
        ...state,
        transfers: initialState.transfers,
      };
    }
    case TransfersActions.transfer: {
      const transfer = action.payload;
      return {
        ...state,
        transfers: upsertOne(transfer, initialState.transfers)
      };
    }
  }
}
