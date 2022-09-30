export class UserDocumentModel {

  Name: string;
  DocumentId: number;
  DocumentCode: string;
  Tin: string;
  File: File;


}

export class UserDocumentDetailModel {
  Link: string;
  Description: string;
  DocumentCode: string;
  Uploaded: boolean;
  DocumentId: number;
}
