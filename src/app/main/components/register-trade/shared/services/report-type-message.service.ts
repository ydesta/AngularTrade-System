import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReportTypeMessageService {
  messageSource: BehaviorSubject<number> = new BehaviorSubject(0);
  sourceMessage: BehaviorSubject<any> = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();
  messageCurrent = this.sourceMessage.asObservable();

  constructor() {}
  updateMessage(message: number) {
    this.messageSource.next(message);
  }

  sendMessage(message: any) {
    this.sourceMessage.next(message);
  }
}
