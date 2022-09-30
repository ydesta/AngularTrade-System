import {Injectable} from '@angular/core';

@Injectable()
export class StaticData {
  public Id: number;
  public Description: string;
}


// For lookups that have ParentId and string Key
@Injectable()
export class StaticData2 {
  public Id: string;
  public ParentId: string;
  public Description: string;
}

export class PagedResult {
  Items: any [];
  ItemsCount: number;
}
