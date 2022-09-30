import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CustomerSearchResultModel} from '../../models/exchange-actor.model';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  public customerSearchData = new BehaviorSubject<CustomerSearchResultModel>(new CustomerSearchResultModel());
  currentCustomerSearchResult = this.customerSearchData.asObservable();


  getCustomerSearchResult() {
    return this.currentCustomerSearchResult;
  }

  setCustomerSearchResult(searchResult: any) {
    this.customerSearchData.next(searchResult);
  }
}
