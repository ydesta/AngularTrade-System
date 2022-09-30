import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../../@custor/services/security/auth.service";
import {ConfigurationService} from "../../../../@custor/services/configuration.service";
import {Router} from "@angular/router";
import {TranslationLoaderService} from "../../../../@custor/services/translation-loader.service";
import {locale as langEnglish} from "src/app/main/lang/en";
import {locale as langEthiopic} from "src/app/main/lang/et";
import { RouteInfo } from '../../navigation/route-interface';

@Component({
  selector: 'app-toolbar-dashboard',
  templateUrl: './toolbar-dashboard.component.html',
  styleUrls: ['./toolbar-dashboard.component.scss']
})
export class ToolbarDashboardComponent implements OnInit {
  @Input() mainNav: any;
  @Input() isUserLoggedIn: boolean;
  @Input() fullNameInLang: string;
  @Input() accountMenuItems: RouteInfo[];
  public username:string;
  constructor(
    private translationService: TranslateService,
    private authService: AuthService,
    public configService: ConfigurationService,
    public router: Router,
    private translationLoaderService: TranslationLoaderService  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    if (!this.configService.language) {
      this.translationService.setDefaultLang('et');
      this.configService.language = 'et';
    } else {
      this.translationService.use(this.configService.language);
    }
   // this.currentLang = this.configService.language;
    this.username=authService.currentUser.UserName
  }

  ngOnInit() {
  }
  settings(){
    this.router.navigate(['auth/manage/1']);
      // const dialogConfig = new MatDialogConfig();
      // dialogConfig.maxWidth = '600px';
      // dialogConfig.id = "ComplaintApplication";
      // // dialogConfig.height = '600px';
      // dialogConfig.position = {
      //   top: '5%',
      //   left: '30%',
      // };
      // dialogConfig.data={
      //   id:1
      // }
      // dialogConfig.width = '65%';
      // //dialogConfig.height='50%';
      // dialogConfig.disableClose = true;
      // dialogConfig.data = '1';
      // const dialogRef = this.myDialog.open(ManagePasswordComponent, dialogConfig, );
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //   }
      // });
    }



  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }
}
