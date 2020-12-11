import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  readonly jsonURL = 'transactions.json';

  constructor(private http: HttpClient) { }

  getTransfers() {
    return this.http.get(this.jsonURL).pipe(map((response:any) => response.json().catch((error:any) => console.log(error))));
  }
}
