import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {Transaction} from "../store/transactions.reducer";
import {Store} from "@ngrx/store";
import {TransfersService} from "../store/transfers.service";
import {TransfersActions} from "../store/transfers-actions";

function getCleanAmount(amount) {
  return amount.replace('$', '').replace(',', '');
}

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent implements OnInit {
  transferForm: FormGroup;
  availableBalance = 5824.76;
  arrowsUrl = 'assets/icons/arrows1.png';
  amountValid: boolean;

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe, private store: Store<{ transactions: Transaction[] }>) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  makeATransfer() {
    const payload: Transaction = {
      transaction: {
        amountCurrency: {
          amount: getCleanAmount(this.transferForm.value.amount),
          currencyCode: 'USD'
        },
        creditDebitIndicator: 'Unknown',
        type: 'Transaction',
      },
      merchant: {name: this.transferForm.value.toAccount, accountNumber: 'Unknown'},
      dates: {valueDate: Date.now()},
      categoryCode: '#0c8397'
    }
    this.store.dispatch(TransfersActions.transfer({transaction: payload}));
    this.availableBalance -= Number(getCleanAmount(this.transferForm.value.amount));
    this.transferForm.reset();
    this.initForm();
  }

  private initForm() {
    this.transferForm = this.fb.group({
      fromAccount: [`Free Checking(4692) - $` + this.availableBalance, Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.transferForm.valueChanges.subscribe(form => {
      this.amountValid = false;
      if (form.amount) {
        form.amount = getCleanAmount(form.amount);
        if (!Number(form.amount)) {
          this.transferForm.patchValue({amount: '$'}, {emitEvent: false});
        } else if (form.amount > (this.availableBalance + 500)) {
          this.transferForm.patchValue({amount: this.currencyPipe.transform((this.availableBalance + 500), 'USD', 'symbol-narrow', '1.0-2')}, {emitEvent: false});
          this.amountValid = true;
        } else {
          this.transferForm.patchValue({
            amount: this.currencyPipe.transform(form.amount, 'USD', 'symbol-narrow', '1.0-2')
          }, {emitEvent: false});
          this.amountValid = true;
        }
      }
    });
  }
}
