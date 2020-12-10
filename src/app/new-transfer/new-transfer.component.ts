import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

interface ITransactiion {
  fromAccount: string;
  toAccount: string;
  amount: number;
}
@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent implements OnInit {
  transferForm: FormGroup;
  transaction: ITransactiion;

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.transaction = {amount: 0, fromAccount: '', toAccount: ''};
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.transferForm.valueChanges.subscribe(form => {
      if(form.amount) {
        form.amount = form.amount.replace('$', '').replace(',', '').replace('.', '');
        this.transferForm.patchValue({
          amount: this.currencyPipe.transform(form.amount, 'USD', 'symbol-narrow', '1.0-2')
        }, {emitEvent: false})
      }
    });
  }

  makeATransfer() {
    // TODO: Use EventEmitter with form value
    console.warn(this.transferForm.value);
    this.transferForm.reset();
  }
}
