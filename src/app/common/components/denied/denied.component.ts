import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss']
})
export class DeniedComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

}
