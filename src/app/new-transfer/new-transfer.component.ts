import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent implements OnInit {
  transferForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  makeATransfer() {
    // TODO: Use EventEmitter with form value
    console.warn(this.transferForm.value);
    this.transferForm.reset();
  }
}
