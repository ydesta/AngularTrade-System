import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { RegisterTradeService } from "../../register-trade/shared/services/register-trade.service";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { AuthService } from "src/@custor/services/security/auth.service";
@Component({
  selector: "app-market-actor-renewal-notification",
  templateUrl: "./market-actor-renewal-notification.component.html",
  styleUrls: ["./market-actor-renewal-notification.component.scss"],
})
export class MarketActorRenewalNotificationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  datasource: any;
  memberId = this.authService.currentUser.ExchangeActorId;
  public displayedColumns: string[] = [
    "IssuedDate",
    "ExpiredDate",
    "GracePeriod",
    "NoOfLeftDay",
  ];
  currentLang = "";
  memberClientTradeList: any;
  constructor(
    private registerTardeService: RegisterTradeService,
    private configService: ConfigurationService,
    private authService: AuthService,
    private translationLoaderService: TranslationLoaderService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
    if (this.memberId != "") {
      this.getExchangeActorRenewalNotification();
    }
  }

  getExchangeActorRenewalNotification() {
    this.registerTardeService
      .getExchangeActorRenewalNotification(this.memberId, this.currentLang)
      .subscribe((res: any) => {
        this.memberClientTradeList = res;
        this.datasource = new MatTableDataSource(this.memberClientTradeList);
        console.log("#####     &&    ", this.datasource);
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;
      });
  }
}
