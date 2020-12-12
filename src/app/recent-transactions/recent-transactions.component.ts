import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TransfersActions} from "../store/transfers-actions";
import {TransfersService} from "../store/transfers.service";
import {Observable} from "rxjs";
import {TransfersSelectors} from "../store/transfers-selectors";
import {Store} from "@ngrx/store";
import {Transaction} from "../store/transactions.reducer";

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  transactions$: Observable<{transactions: Transaction[]}>;
  sortBy: string;
  sortOrder: string = 'asc';

  constructor(private store: Store<{ transactions: Transaction[] }>, private transfersService: TransfersService, private transactionsSelectors: TransfersSelectors) {
    // @ts-ignore
    this.transactions$ = store.select('transactions');
    this.transactions$.subscribe((result) => console.log(result));
  }

  ngOnInit(): void {
    this.transfersService.getTransactions().subscribe((data: Transaction[]) => {
                data.forEach((transaction) => transaction._id = transaction.merchant.accountNumber);
                console.log(data);
                this.store.dispatch(TransfersActions.setTransactions({transactions: data}));
              })
  }

  getSortOrder() {
    return this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  sort($event: any) {
    this.sortBy = $event.sortBy; this.sortOrder = $event.sortOrder
  }
}
