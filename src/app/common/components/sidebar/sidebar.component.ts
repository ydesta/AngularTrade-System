import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { MatExpansionPanel } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../main/lang/en";
import { locale as langEthiopic } from "../../../main/lang/et";
import { NavService } from "./nav.service";
import { User } from "../../../../@custor/models/user.model";
import { RouteInfo } from '../../navigation/route-interface';
import { AuthService } from 'src/@custor/services/security/auth.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { SUPER_ADMIN, VIEW_ADMIN, VIEW_SETTING, VIEW_USER, VIEW_ROLE, MANAGE_ROLE, MANAGE_SETTING, MANAGE_USER, SITE_ADMIN, TRADE_EXECUTION_REPORTER, DIRECT_TRADING_DATA_OFFICER, MEMBER_DATA_OFFICER, AUDITOR_DATA_OFFICER } from '../../constants/permissionConsts';
import { ADMIN_ROUTES } from '../../navigation/sidebar-admin';
import { ACCOUNT_MENU, CUSTOMER_ROUTES } from '../../navigation/sidebar-customer';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  fullNameInLang: string;
  // @ViewChild('customer', {static: false}) customerExpander: MatExpansionPanel;
  private _mobileQueryListener: () => void;

  isUserLoggedIn: boolean;
  isAdminExpanded = false;
  removePrebootScreen: boolean;
  newNotificationCount = 0;
  appTitle = "ICERS";
  appLogo = "";
  items: number[] = [1, 2, 3];

  public expansionPanelClosed: boolean;

  public matExpansionPanel: MatExpansionPanel;
  public menuItems: Array<RouteInfo>;
  userType: string;
  currentUser: User;
  public accountMenuItems: RouteInfo[];
  @ViewChild("mainNav", { static: false }) mainNav: ElementRef;

  mobileQuery: MediaQueryList;

  constructor(
    private authService: AuthService,
    public configService: ConfigurationService,
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private translationLoaderService: TranslationLoaderService,
    private navService: NavService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.menuItems = [];
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.getSideBarMenu();
    this.getAccountMenus();
    this.getFullNameInLang();
    this.isUserLoggedIn = true;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  get userName(): string {
    return this.authService.currentUser
      ? this.authService.currentUser.UserName
      : "";
  }

  get fullName(): string {
    return this.authService.currentUser
      ? this.authService.currentUser.FullName
      : "";
  }

  getFullNameInLang() {
    this.fullNameInLang = this.currentUser.UserName;
  }

  initModels() {
    this.menuItems = [];
  }

  canOpenExpansionPanel(panel: MatExpansionPanel, path) {
    // check if the path is found in the activated route so that it opens the expansion

    return this.router.url.includes(path);
  }
  public colapse() {
    if (this.expansionPanelClosed) {
      this.expansionPanelClosed = false;
    } else {
      this.expansionPanelClosed = true;
    }
  }

  ngAfterViewInit() {
    this.navService.mainNav = this.mainNav;
  }

  private getSideBarMenu() {
    if (
      this.currentUser.Roles.indexOf(SUPER_ADMIN) >= 0 ||
      this.currentUser.Roles.indexOf(VIEW_ADMIN) >= 0 ||
      this.authService.currentUser.Roles.indexOf(VIEW_SETTING) >= 0 ||
      this.authService.currentUser.Roles.indexOf(VIEW_USER) >= 0 ||
      this.authService.currentUser.Roles.indexOf(VIEW_ROLE) >= 0 ||
      this.authService.currentUser.Roles.indexOf(MANAGE_ROLE) >= 0 ||
      this.authService.currentUser.Roles.indexOf(MANAGE_SETTING) >= 0 ||
      this.authService.currentUser.Roles.indexOf(MANAGE_USER) >= 0
    ) {
      for (const role of this.currentUser.Roles) {

        ADMIN_ROUTES.filter((route) => {
          if (route.userType.indexOf(role) >= 0) {
            // assign parent rout to temp route with empty children array
            let tempParentRoute: RouteInfo = {
              userType: route.userType,
              path: route.path,
              iconType: route.iconType,
              collapse: route.collapse,
              no: route.no,
              title: route.title,
              type: route.type,
              children: [],
            };

            // temp children array
            for (const child of route.children) {
              if (child.userType.indexOf(role) >= 0) {
                // temp parent children object
                let tempParentChildRoute: RouteInfo = {
                  userType: child.userType,
                  path: child.path,
                  iconType: child.iconType,
                  collapse: child.collapse,
                  no: child.no,
                  title: child.title,
                  type: child.type,
                  children: [],
                };

                const tempChildren = [];
                for (const childOfChild of child.children) {
                  if (childOfChild.userType.indexOf(role) >= 0) {
                    tempChildren.push(childOfChild);
                  }
                }
                tempParentChildRoute.children = tempChildren;
                tempParentRoute.children.push(tempParentChildRoute);
              }
            }
            this.menuItems.push(tempParentRoute);
          }
        });
      }
    } else{
      this.getCustomerMenuList2(this.currentUser.Roles);
      this.menuItems = this.removeDuplicateMenu(
        this.menuItems,
        (it) => it.path
      ) as RouteInfo[];
    }
    // else if (this.currentUser.Roles.indexOf(DIRECT_TRADING_DATA_OFFICER) >= 0) {
    //   CUSTOMER_ROUTES.filter((routr) => {
    //     if (routr.userType.indexOf(DIRECT_TRADING_DATA_OFFICER) >= 0) {
    //       this.menuItems.push(routr);
    //     }
    //   });
    // }else if(this.currentUser.Roles.indexOf(MEMBER_DATA_OFFICER) >= 0){
    //   CUSTOMER_ROUTES.filter((routr) => {
    //     if (routr.userType.indexOf(MEMBER_DATA_OFFICER) >= 0) {
    //       this.menuItems.push(routr);
    //     }
    //   });
    // }else if(this.currentUser.Roles.indexOf(AUDITOR_DATA_OFFICER) >= 0){
    //   CUSTOMER_ROUTES.filter((routr) => {
    //     if (routr.userType.indexOf(AUDITOR_DATA_OFFICER) >= 0) {
    //       this.menuItems.push(routr);
    //     }
    //   });
    // }
  }
  

  private getAccountMenus() {
    if (
      this.currentUser.Roles.indexOf(SUPER_ADMIN) >= 0 ||
      this.currentUser.Roles.indexOf(SITE_ADMIN) >= 0 ||
      this.currentUser.Roles.indexOf(VIEW_ADMIN)
    ) {
      this.accountMenuItems = ACCOUNT_MENU;
    }
  }

  private removeDuplicateMenu(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  private getCustomerMenuList2(roles: string[]) {
    for (const role of roles) {
      const x = CUSTOMER_ROUTES.filter((route) => {
        if (route.userType.indexOf(role) >= 0) {
          const tempParentRoute: RouteInfo = {
            userType: route.userType,
            path: route.path,
            iconType: route.iconType,
            collapse: route.collapse,
            no: route.no,
            title: route.title,
            type: route.type,
            children: [],
          };

          // temp children array
          for (const child of route.children) {
            if (child.userType.indexOf(role) >= 0) {
              // temp parent children object
              const tempParentChildRoute: RouteInfo = {
                userType: child.userType,
                path: child.path,
                iconType: child.iconType,
                collapse: child.collapse,
                no: child.no,
                title: child.title,
                type: child.type,
                children: [],
              };

              const tempChildren = [];
              for (const childOfChild of child.children) {
                if (childOfChild.userType.indexOf(role) >= 0) {
                  tempChildren.push(childOfChild);
                }
              }
              tempParentChildRoute.children = tempChildren;
              tempParentRoute.children.push(tempParentChildRoute);
            }
          }
          this.menuItems.push(tempParentRoute);
        }
      });
    }
  }
}
