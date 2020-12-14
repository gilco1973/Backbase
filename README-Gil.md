# Backbase Front End Assignment: Make A Transaction- My Solution

## System structure

Based on the design We have the app component that contain two components:
* new-transfer - contains the logic and view for making a transfer
* recent-transactions - shows recent transactions

Each child component contains a shared "header" component.

In addition, we have custom components:
* backbase-radio - a custom radio box for displaying the sort options

## CSS
I'm using SCSS with my custom style, no framework.
I used media queries for responsiveness

## State Management
State is manged using redux pattern with ngrx.

Store folder contains the following:
* transafer-service.ts - reads the list of saved transactions from the mock json file.
* transafer-reducer.ts - keeps transactions on the state
* transfer-actions.ts - defines actions for get/set the recent transactions and for making a transfer
* model.ts - contains the ITransfer interface

#Pipes
* I used currency pipe to display the amount as a USD currency

## Transaction Flow
Fill in the target account and amount to transfer.

### Amount validation
* Note that you cannot transfer more than the current balance + $500
* Entering invalid characters will not register.
* Entering an amount that's bigger that your balance + 500 will limit the maximum amount to that figure of balance + 500.  

After transferring the amount the new record is dispatched to the state and inserted to teh transactions collection in the state.
The transactions observable is registered to the state's observables collection and reflects the change.

## Misc
* I could have put the current balance also in the state management but decided it's not really crucial.
* No design was provided for previewing a transaction, so I skipped that part

Cheers,

Gil Klainert
