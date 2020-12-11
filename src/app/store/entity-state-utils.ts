import {combineLatest, Observable} from 'rxjs';
import {ITransfer} from "./model";

export interface DictionaryNum<T> {
  [id: number]: T;
}

export abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T;
}

export interface EntityState<T> {
  ids: string[];
  entities?: Dictionary<T>;
  selectedId?: any;
}

export interface EntityStateIds<T> {
  ids: string[];
  entities?: Dictionary<T>;
}

export const initialMarkerState = {
  ids: []
};

export function addOne<T>(entity: any, state: EntityState<T>, key: string = '_id'): EntityState<T> {
  return {
    ...state,
    entities: {...state.entities, [entity[key]]: entity},
    ids: [...state.ids, entity[key]]
  };
}

export function addMany<T>(entities: T[], state: EntityState<T>, key: string = '_id'): EntityState<T> {
  for (let i = 0; i < entities.length; i++) {
    state = addOne(entities[i], state, key);
  }
  return {...state};
}

export function addAll<T>(entities: T[], state: EntityState<T>, key: string = '_id'): EntityState<T> {
  return {
    ...state,
    entities: entities.reduce<Dictionary<T>>(
      (final, current) => {
        return {
          ...final,
          [current[key]]: current
        };
      },
      {},
    ),
    ids: entities.map(entity => entity[key])
  };
}

export function upsertMany<T>(entities: T[], state: EntityState<T>, key: string = '_id'): { ids: any[], entities: any } {
  return {
    ...state,
    entities: Object.assign(state.entities, entities.reduce<{ [projectId: string]: { [flightId: string]: any } }>(
      (final, current) => {
        return {
          ...final,
          [current[key]]: current
        };
      },
      {},
    )),
    ids: Array.from(new Set([...state.ids].concat(entities.map(entity => entity[key]))))
  };
}

export function updateMany<T>(updates: Array<{ id: string, changes: any }>, state: EntityState<T>) {
  for (let i = 0; i < updates.length; i++) {
    state = updateOne(updates[i], state);
  }
  return {...state};
}

export function upsertOne<T>(entity: any, state: EntityState<T>, key: string = '_id'): { ids: any[], entities: any } {
  return {
    ...state,
    entities: {...state.entities, [entity[key]]: Object.assign({}, state.entities[entity[key]], entity)},
    ids: [...state.ids, entity[key]].reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
  };
}

export function updateOne<T>(update: { id: string, changes: any }, state: EntityState<T>) {
  return {
    ...state,
    entities: Object.assign({}, state.entities, {
      [update.id]: Object.assign({}, state.entities[update.id], update.changes)
    })
  };
}

export function removeOne<T>(state: EntityState<T>, id: string): { ids: any[], entities: any } {
  const entities: any = {...state.entities};
  delete (entities[id]);

  const ids = [...state.ids].filter((_id: string) => _id !== id);

  return {
    ...state,
    entities: entities,
    ids: ids
  };
}

export function removeMany<T>(state: EntityState<T>, ids: any[]): { ids: any[], entities?: any } {
  for (let i = 0; i < ids.length; i++) {
    state = removeOne(state, ids[i]);
  }
  return state;
}

export function removeAll<T>(state: EntityState<T>): EntityState<T> {
  state.entities = {};
  state.ids = [];
  if (state.selectedId) {
    state.selectedId = null;
  }
  return {...state};
}

export function sortByLastUpdate(a: ITransfer, b: ITransfer): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getEntities<T>(state: any): Observable<{ [key: string]: T }> {
  return combineLatest(state, (source: EntityState<T>) => source ? source.entities : {});
}

export function getEntity<T>(entities: Observable<{ [key: string]: T }>, id: Observable<string>): Observable<T> {
  return combineLatest(entities, id, (_entities: { [key: string]: T }, _id: string) => _entities[_id]);
}

export function getAll<T>(state: any): Observable<T[]> {
  return combineLatest(state, (source: EntityState<T>) => source ? Object.values(source.entities) : []);
}

export function getIds<T>(state: any): Observable<any[]> {
  return combineLatest(state, (source: EntityState<T>) => source ? source.ids : []);
}

export function getTotal<T>(state: any): Observable<number> {
  return combineLatest(state, (source: EntityState<T>) => source ? source.ids.length : 0);
}

