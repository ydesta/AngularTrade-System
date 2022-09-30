import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AuthService} from "../../../../@custor/services/security/auth.service";
import {Router} from "@angular/router";

@Component( {
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
} )
export class NotFoundComponent implements OnInit {

  constructor(private _location: Location, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  back() {
    if (this.authService.isLoggedIn) {
      this._location.back();
    } else {
      this.router.navigate( ['/'] );
    }

  }
}
