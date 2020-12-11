import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TransfersActionsService} from "../store/transfers-actions";
import {TransfersService} from "../store/transfers.service";
import * as data from '../mock/transactions.json'
import {ITransaction, ITransfer} from "../store/model";

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit, AfterViewInit {
  transactions: ITransaction[];

  constructor(private transfersService: TransfersService, private transactionsActions: TransfersActionsService) {
  }

  ngOnInit(): void {
    // this.transfersService.getTransfers().subscribe((data: any[]) => {
    this.transactions = (data as any)?.default?.data;
      console.log(this.transactions);
    // })
  }

  ngAfterViewInit(): void {
    // this.transactionsActions.enter();
  }

}
