import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AccountService} from 'src/@custor/services/security/account.service';
import {AuthService} from 'src/@custor/services/security/auth.service';
import {TranslateService} from '@ngx-translate/core';

import {locale as langEnglish} from './lang/et';
import {locale as langEthiopic} from './lang/en';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Subject} from 'rxjs';
import {ONLINE_USER, SITE_ADMIN, SUPER_ADMIN, VIEW_ADMIN, VIEW_SETTING, VIEW_USER, VIEW_ROLE, MANAGE_ROLE, MANAGE_SETTING, MANAGE_USER} from 'src/app/common/constants/permissionConsts';

@Component( {
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
} )
export class AdminComponent implements OnInit {
  private currentLang: string;
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private translationService: TranslateService,
              public configService: ConfigurationService,
              private accountService: AccountService,
              private authService: AuthService,
              private translationLoaderService: TranslationLoaderService,
              public router: Router,
              private ngxLoader: NgxUiLoaderService,
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations( langEnglish, langEthiopic );
    this.setTimeout();
    this.userInactive.subscribe( () => {
      this.logout();
    } );
  }

  ngOnInit() {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        this.ngxLoader.start();
        const getUrl = event;
        if (getUrl.url !== getUrl.url.toLowerCase()) {
          this.router.navigateByUrl( (getUrl.url.toLowerCase()) );
          this.ngxLoader.start();
        }
      } else if (event instanceof NavigationEnd) {
        this.ngxLoader.stop();
      } else {
        this.ngxLoader.stop();
      }
    } );
  }

  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  setTimeout() {
    this.userActivity = setTimeout( () => {
      if (this.authService.isLoggedIn
        && (this.authService.currentUser.Roles.indexOf( SUPER_ADMIN ) >= 0
          || this.authService.currentUser.Roles.indexOf( SITE_ADMIN ) >= 0
          || this.authService.currentUser.Roles.indexOf( VIEW_ADMIN ) >= 0
        ||this.authService.currentUser.Roles.indexOf(VIEW_SETTING) >= 0
        ||this.authService.currentUser.Roles.indexOf(VIEW_USER) >= 0
        ||this.authService.currentUser.Roles.indexOf(VIEW_ROLE) >= 0
        ||this.authService.currentUser.Roles.indexOf(MANAGE_ROLE) >= 0
        ||this.authService.currentUser.Roles.indexOf(MANAGE_SETTING) >= 0
        ||this.authService.currentUser.Roles.indexOf(MANAGE_USER) >= 0)) {
        this.userInactive.next( undefined );
      }
    }, 420000 );
  }

  @HostListener( 'window:mousemove' ) refreshUserState() {
    clearTimeout( this.userActivity );
    this.setTimeout();
  }

}
