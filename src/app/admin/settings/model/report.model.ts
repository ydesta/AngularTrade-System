
export class ReportSetting {
    ReportTitle: string;
    ReportTitleAmaric: string;
    DirectorName: string;
    DirectorNameAmharic: string;
    OrganizationLogo: string;
    DirectorSigniture: string;
   
  }

  
  export class RenewalSetting{

    RenewalDuration: Float32Array;
    RenewalDurationUnit: string;
    TemporaryRenewalDuration: Float32Array;
    TemporaryRenewalDurationUnit: string;
    }


  export class Unit{

  value: number;
  viewValue: string;
  viewValueAm: string
  }
  export class MonthList{

    Value: number;
    Eng: string;
    Amh: string;

    }