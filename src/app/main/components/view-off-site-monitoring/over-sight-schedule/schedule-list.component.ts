import { PaginationService } from "src/@custor/services/pagination.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { locale as english } from "src/app/main/components/register-trade/lang/en";
import { locale as amharic } from "src/app/main/components/register-trade/lang/et";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";
import { ScheduleService } from "../../register-trade/shared/services/schedule.service";
import { AuthService } from "src/@custor/services/security/auth.service";
//import { ScheduleService } from '../shared/services/schedule.service';
@Component({
  selector: "app-schedule-list",
  templateUrl: "./schedule-list.component.html",
  styleUrls: ["./schedule-list.component.scss"],
})
export class ScheduleListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  lang: string;
  currentMonth: number;
  currentYear: number;
  datasource: any;
  memberId = this.authService.currentUser.ExchangeActorId;
  public displayedColumns: string[] = [
    "ExchangeActor",
    "Address",
    "ScheduleDate",
  ];
  constructor(
    private config: ConfigurationService,
    public paginationService: PaginationService,
    private scheduleservice: ScheduleService,
    private authService: AuthService,
    private translationLoadService: TranslationLoaderService
  ) {
    this.lang = this.config.language;
    this.translationLoadService.loadTranslations(english, amharic);
  }

  ngOnInit() {
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();

    this.getScheduleForCurrentMonth();
  }
  getScheduleForCurrentMonth() {
    const filter = new ScheduleCriteria();
    filter.ScheduleMonth = this.currentMonth;
    filter.ScheduleYear = this.currentYear;
    filter.ExchangeActorId = this.memberId;
    this.scheduleservice
      .FetchCurrentMonthSchedule(filter)
      .subscribe((schedule: any) => {
        this.datasource = new MatTableDataSource(schedule);
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;
      });
  }
}
export class ScheduleCriteria {
  ScheduleYear: number;
  ScheduleMonth: number;
  ExchangeActorId: string;
}
