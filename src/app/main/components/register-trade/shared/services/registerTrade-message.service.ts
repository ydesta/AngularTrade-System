import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterTradeMessageService {
  messageSource: BehaviorSubject<number> = new BehaviorSubject(0);
  sourceMessage: BehaviorSubject<any> = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();
  messageCurrent = this.sourceMessage.asObservable();
  customerUpdate$: Observable<any>;
  private customerUpdateSubject = new Subject<any>();
  constructor() {
    this.customerUpdate$ = this.customerUpdateSubject.asObservable();
  }

  updateMessage(message: number) {
    this.messageSource.next(message);
  }

  sendMessage(message: any) {
    this.sourceMessage.next(message);
  }
  updatedCustomer(dataAsParams) {
    this.customerUpdateSubject.next(dataAsParams);
  }
}
