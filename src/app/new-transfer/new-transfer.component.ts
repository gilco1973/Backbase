import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent implements OnInit {
  transferForm: FormGroup;
  availableBalance = 5824.76;
  arrowsUrl = 'assets/icons/arrows1.png';

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccount: [`Free Checking(4692) - $` + this.availableBalance, Validators.required],
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
