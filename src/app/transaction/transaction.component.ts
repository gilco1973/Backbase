import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Transaction} from "../store/transactions.reducer";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnChanges {

  @Input() transaction: Transaction

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transaction.currentValue) {
      console.log(this.transaction);
    }
  }

  getTransactionImage() {
    const imageName = this.transaction?.merchant.name.toLowerCase().trim().replace(/ +/g, '-');
    return `url(../../../assets/icons/${imageName}.png`;
  }
}
