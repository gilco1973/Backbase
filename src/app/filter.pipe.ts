import { Pipe, PipeTransform } from '@angular/core';
import {Transaction} from "./store/transactions.reducer";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Transaction[], searchTerm: string): any {
    if (!value || !searchTerm) {
      return value;
    }
    return value.filter((transaction) => transaction.merchant.name.toLowerCase().includes(searchTerm));
  }
}
