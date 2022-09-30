import {Injectable} from '@angular/core';

@Injectable()
export class Lookup {
  public LookupId: number;
  public LookupTypeId: number;
  public English: string;
  public Amharic: string;
}

@Injectable()
export class LookupType {
  public LookupTypeId: number;
  public DescriptionEnglish: string;
  public Description: string;
}

@Injectable()
export class MaritalStatus {
  public Id: number;
  public Desc: string;
}

@Injectable()
export class Gender {
  public Id: number;
  public Desc: string;
}

@Injectable()
export class LegalStatus {
  public Id: number;
  public Desc: string;
}

@Injectable()
export class Quantity {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class TariffMode {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class BusinessType {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class SectorType {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class CurrencyType {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class ProjectStatusModel {
  public Id: any;
  public Description: string;
  public DescriptionEnglish: string;

}

@Injectable()
export class ProjectStageModel {
  public Id: any;
  public Description: string;
  public DescriptionEnglish: string;

}

@Injectable()
export class ApplicationStatusModel {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;

}

@Injectable()
export class QuarterModel {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class UnitType {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class RegistrationStatus {
  public Id: number;
  public Desc: string;
}

@Injectable()
export class Decisions {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class Services {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class ServiceType {
  public Id: number;
  public Description: string;
  public DescriptionEnglish: string;
}

@Injectable()
export class CustomerService {
  public Id: number;
  public Desc: string;
  public Title: string;
}

export class LookupData {
  public DescriptionEng: string;
  public DescriptionAmh: string;
}
