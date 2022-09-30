import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { Observable } from "rxjs/internal/Observable";
import { searchScheduleCriteria } from "../models/ScheduleModel";

@Injectable({
  providedIn: "root",
})
export class ScheduleService extends EndpointFactory {
  private readonly scheduleUrl: string = "api/schedule";

  MONTHS: any = [
    {
      id: 1,
      NameEng: "January",
      NameAmh: "ጥር",
    },
    {
      id: 2,
      NameEng: "February",
      NameAmh: "የካቲት",
    },
    {
      id: 3,
      NameEng: "March",
      NameAmh: "መጋቢት",
    },
    {
      id: 4,
      NameEng: "April",
      NameAmh: "ሚያዚያ",
    },
    {
      id: 5,
      NameEng: "May",
      NameAmh: "ግንቦት",
    },
    {
      id: 6,
      NameEng: "June",
      NameAmh: "ሰኔ",
    },
    {
      id: 7,
      NameEng: "July",
      NameAmh: "ሃምሌ",
    },
    {
      id: 8,
      NameAmh: "ነሃሴ",
      NameEng: "August",
    },
    {
      id: 9,
      NameEng: "September",
      NameAmh: "መስከረም",
    },
    {
      id: 10,
      NameEng: "October",
      NameAmh: "ጥቅምት",
    },
    {
      id: 11,
      NameEng: "November",
      NameAmh: "ህዳር",
    },
    {
      id: 12,
      NameEng: "December",
      NameAmh: "ታህሳስ",
    },
  ];

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }

  get scheduleEndPoint() {
    return this.config.baseUrl + this.scheduleUrl;
  }

  UploadSchedule(schedule: any) {
    return this.httpClient.post(
      this.scheduleEndPoint + "/addSchedule",
      schedule
    );
  }
  UpdateSchedule(schedule: any) {
    return this.httpClient.post(
      this.scheduleEndPoint + "/updateSchedule",
      schedule
    );
  }
  UpdateSingleSchedule(schedule: any) {
    return this.httpClient.put(
      this.scheduleEndPoint + "/UpdateSingleSchedule",
      schedule
    );
  }

  getSchedule(parametres: any): Observable<any> {
    const cParams = new HttpParams()
      .append("PageCount", parametres.PageCount.toString())
      .append("PageNumber", parametres.PageNumber.toString())
      .append("Lang", parametres.Lang == "" ? "" : parametres.Lang);
    return this.httpClient.get(this.scheduleEndPoint + "/getSchedule", {
      params: cParams,
    });
  }

  getScheduleByMonths(parameters: searchScheduleCriteria): Observable<any> {
    const cParams = new HttpParams()
      .append("PageCount", parameters.PageCount.toString())
      .append("ScheduleMonth", parameters.ScheduleMonth.toString())
      .append(
        "ScheduleYear",
        parameters.ScheduleYear == undefined
          ? new Date().getFullYear().toString()
          : parameters.ScheduleYear.toString()
      );
    return this.httpClient.get(
      this.scheduleEndPoint + "/CountScheduleByMonths",
      { params: cParams }
    );
  }

  FetchCurrentMonthSchedule(parameters: any) {
    const cParams = new HttpParams()
      .append("ExchangeActorId", parameters.ExchangeActorId.toString())
      .append("ScheduleMonth", parameters.ScheduleMonth.toString())
      .append(
        "ScheduleYear",
        parameters.ScheduleYear == undefined
          ? new Date().getFullYear().toString()
          : parameters.ScheduleYear.toString()
      );
    return this.httpClient.get(
      this.scheduleEndPoint + "/getCurrentMonthSchedule",
      { params: cParams }
    );
  }

  getMonths() {
    return this.MONTHS;
  }

  SearchSchedule(searchFilter: searchScheduleCriteria) {
    const cParams = new HttpParams()
      .append("PageCount", searchFilter.PageCount.toString())
      .append("PageNumber", searchFilter.PageNumber.toString())
      .append(
        "ScheduleMonth",
        searchFilter.ScheduleMonth == null
          ? "0"
          : searchFilter.ScheduleMonth.toString()
      )
      .append(
        "ScheduleYear",
        searchFilter.ScheduleYear == null
          ? "0"
          : searchFilter.ScheduleYear.toString()
      );
    return this.httpClient.get(this.scheduleEndPoint + "/SearchSchedule", {
      params: cParams,
    });
  }

  FetchMonthlySchedule() {
    return this.httpClient.get(this.scheduleEndPoint + "/getMonthlySchedule");
  }
}
