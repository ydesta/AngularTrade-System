import { Injectable } from "@angular/core";

@Injectable()
export class StaticData {
  public Id: number;
  public Description: string;
}
export class StaticData12 {
  public Id: string;
  public Description: string;
}
export class StaticData8 {
  public Id: number;
}

export class StaticData5 {
  public Id: string;
  public Description: string;
}

// For lookups that have ParentId and string Key
@Injectable()
export class StaticData2 {
  public Id: number;
  public ParentId: number;
  public Description: string;
}
@Injectable()
export class LookUpType {
  public LookupTypeId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
}
@Injectable()
export class LookUp {
  public LookupTypeId: number;
  public LookupId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
}
export class StaticData6 {
  public Id: number;
  public ParentId: string;
  public Description: string;
}
export class StaticData9 {
  public Id: string;
  public ParentId: string;
  public Description: string;
}

export class StaticData3 {
  public TypeId: number;
}

export class StaticData4 {
  public rpList: Array<StaticData3>;
}

export interface ServiceStatus {
  ExchangeActorStatus: number;
  ServiceApplicationStatus: number;
}

export class StaticData7 {
  public Id: number;
  public ParentId: number;
  public Amount: number;
}

@Injectable()
export class CaseStaticData {
  public Id: number;
  public Code: string;
  public GroupCode: string;
  public SubGroupCode: string;
  public Description: string;
}
