import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTransferComponent } from './new-transfer/new-transfer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { HeaderComponent } from './header/header.component';
import {CurrencyPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import {TransfersSelectors} from "./store/transfers-selectors";
import {NgReduxModule} from "@angular-redux/store";
import {NgReduxRouterModule} from "@angular-redux/router";
import { StoreModule } from '@ngrx/store';
import * as transactionsReducer from "./store/transactions.reducer";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { BackbaseRadioComponent } from './backbase-radio/backbase-radio.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewTransferComponent,
    RecentTransactionsComponent,
    HeaderComponent,
    TransactionComponent,
    TransactionsComponent,
    BackbaseRadioComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    StoreModule.forRoot({ transactions: transactionsReducer.transactionsReducer }),
    ReactiveFormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [CurrencyPipe, TransfersSelectors],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}
}
