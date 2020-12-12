import { Pipe, PipeTransform } from '@angular/core';
import {Transaction} from "./store/transactions.reducer";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: Transaction[], sortOrder: string = 'asc', sortKey?: string): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let numberArray = [];
    let stringArray = [];

    if (!sortKey) {
      return value;
    } else {
      let sorted = value;
      switch (sortKey) {
        case 'DATE':
          sorted = value.slice().sort((a, b) =>
            new Date(a.dates.valueDate).getDate() -
            new Date(b.dates.valueDate).getDate());
          break;
        case 'BENEFICIARY':
          sorted = value.slice()
            .filter(item => typeof item.merchant.name === 'string')
            .sort((a, b) => {
              if (a.merchant.name < b.merchant.name) return -1;
              else if (a.merchant.name > b.merchant.name) return 1;
              else return 0;
            });
          break;
        case 'AMOUNT':
          sorted = value.slice().sort((a, b) => a.transaction.amountCurrency.amount - b.transaction.amountCurrency.amount);
          break;
        default:
          return sorted;
      }
      return sortOrder === 'asc' ? sorted : sorted.reverse();
    }
  }
}

