import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  mainNav: any;
  constructor() { }

  public closeNav(){
    this.mainNav.close();

  }

}
