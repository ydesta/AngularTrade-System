import DateTimeFormat = Intl.DateTimeFormat;

export class Prerequisite {
  PrerequisiteId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
  // IsUserDocument: boolean;
  // IsDocument: boolean;
  // IsActive: boolean;
}

export class ServicePrerequisite {
  ServicePrerequisiteId: number;
  PrerequisiteId: number;
  ServiceId: string;
  CustomerTypeId: boolean;
  IsRequired: boolean;
  IsDocument: boolean;
  IsActive: boolean;
}

export class ServicePrerequisiteDTO {
  ServicePrerequisiteId: number;
  PrerequisiteId: number;
  Description: string;
  EnglishDescription: string;
  IsRequired: boolean;
}
