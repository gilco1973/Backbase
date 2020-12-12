import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as data from '../mock/transactions.json'
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Transaction} from "./transactions.reducer";

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor() { }

  getTransactions = (): Observable<Transaction[]> => of((data as any)?.default?.data);
}
