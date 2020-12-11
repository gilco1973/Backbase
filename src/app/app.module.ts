import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTransferComponent } from './new-transfer/new-transfer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { HeaderComponent } from './header/header.component';
import {CurrencyPipe} from "@angular/common";
import {TransfersActionsService} from "./store/transfers-actions";
import {HttpClientModule} from "@angular/common/http";
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTransferComponent,
    RecentTransactionsComponent,
    HeaderComponent,
    TransactionComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CurrencyPipe, TransfersActionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
