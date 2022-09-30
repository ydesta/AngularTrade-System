//import {MemberProduct} from './member-product.model';
import { AddressModel } from "src/app/common/models/address.model";

export class RepresentativeType {
  RepresentativeTypeId: number;
}

export class ExchangeActorModel extends AddressModel {
  ExchangeActorId?: string;
  Tin: number;
  ServiceApplicationId: string;
  Ecxcode?: string;
  CustomerTypeId: number;
  MemberCategoryId?: string;
  DelegatorId?: string;
  OrganizationNameEng?: string;
  OrganizationNameAmh?: string;
  OrganizationTypeId?: string;
  BuisnessFiledId?: string;
  OrganizationAreaNameAmh?: string;
  OrganizationAreaNameEng?: string;
  OrganizationEstablishedDate?: string;
  MemberRepresentativeType?: Array<RepresentativeType>;
  NetWorthCapital: number;
  DelgatorOrganizationName: string;
  RegistrationNumber: string;
  HeadOffice: string;
  HeadOfficeAmh: string;
  DelegatorTypeId: number;
}

export class CustomerSearchResultModel {
  ExchangeActorId: string;
  LegalBodyName: string;
  LegalBodyFatherName: string;
  LegalBodyGrandFatherName: string;
  OrganizationName: string;
  CustomerType?: string;
  CustomerTypeId: number;
  FullName: string;
  ServiceApplicationId: string;
  Status: number;
  Tin: number;
  Ecxcode: string;
  ActiveReprsentativeCount: number;
  IsLicenceExpired: boolean;
  DelegatorId: string;
}

export class CustomerSearchCriteriaWithPagination {
  // For pagination
  public Lang: string;
  public PageIndex: number;
  public PageSize: number;
  // For search-dialog criteria
  LegalBodyName?: string;
  LegalBodyFatherName?: string;
  LegalBodyGrandFatherName?: string;
  OrganizationName: string;
  CustomerType?: string;
  Ecxcode?: number;
  Tin?: string;
  MemberCategory?: string;
  // ServiceId: string;
}

export class PaymentOrderCriteriaWithPagination {
  // For pagination
  public Lang: string;
  public PageIndex: number;
  public PageSize: number;
  // For search-dialog criteria
  // LegalBodyName?: string;
  // LegalBodyFatherName?: string;
  // LegalBodyGrandFatherName?: string;
  OrganizationName?: string;
  ServiceType?: number;
  PaymentStatus: number;
  From: Date;
  To: Date;
  Name: string;
  FatherName: string;
  GrandFatherName: string;
  Ecxcode: string;
}

export class SisterCompanyModel extends AddressModel {
  public SisterCompanyId: number;
  public OrganizationNameEng: string;
  public OrganizationNameAmh: string;
  public BusinessFiledId?: number;
  public IsEcxMember: boolean;
  public ExchangeActorId: string;
  public MemberSisteCompanyId: string;
}

export class EcxMemberSisterCompanyModel {
  public ECXMemberSisterCompanyId: number;
  public ExchagneActorId: string;
  public MemberExchangeActorId: string;
}

export class SisterCompanyDisplayModel {
  public SisterCompnayId: number;
  public OrganizationName: string;
  public BusinessFiled: string;
  public IsEcxMember: boolean;
  public MobileNo: string;
}

export class RecognitionListModel {
  ExchangeActorType: string;
  CustomerFullName: string;
  Photo: string;
  MobilePhone: string;
  CertificateIssueDate: string;
  CertificateExpireDate: string;
  OrganizationName: string;
}
