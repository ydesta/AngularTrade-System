export class MemberTradeUploadModel {
  AttachmentId?: number;
  ParentId?: number;
  AttachmentContent?: string;
  SelectedWord?: string;
  AuditorId: number;
  FileType?: number;
  Url?: string;
  Remark?: string;
}
export class TradeAttachmentDialogModel {
  ParentId?: number;
  AttachmentType?: reportAttchmentType;
  Url?: string;
}
export enum reportAttchmentType {
  member,
  client,
  finance
}

export class AttachmentViewModel {
  AttachmentId?: number;
  ParentId?: number;
  AttachmentContent?: string;
  SelectedWord?: string;
  Url?: string;
  FileType?: number;
  Remark?: string;
  CreatedDate?: Date;
  UpdatedDate?: Date;
  AuditorId: string;
}
