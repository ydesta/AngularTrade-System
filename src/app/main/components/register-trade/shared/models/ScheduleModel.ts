export class ScheduleModel {
  ScheduleId: number;
  ExchangeActor: string;
  ScheduleYear: number;
  ScheduleDate: string;
  ScheduleMonth: number;
  Address: number;
  CreatedUserId: string;
  UpdatedUserId?: string;
}
export class searchScheduleCriteria {
  ScheduleMonth: number;
  ScheduleYear: number;
  PageCount: number;
  PageNumber: number;
}
export class UpdateSingleScheduleModel {
  ScheduleId: number;
  ExchangeActor: string;
  ScheduleYear: number;
  ScheduleDate: string;
  ScheduleMonth: number;
  Address: number;
  UpdatedUserId: string;
}

