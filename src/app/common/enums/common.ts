export enum ExchangeActorParticipant {
  REPRESENTATIVE = 63,
  MEMBER = 6,
  NON_MEMBER_DIRECT_TRADER = 90,
  INDPENDENT_AUDITOR = 5,
  CLEARING_INSTITUTION = 69,
}

export enum MemberCategory {
  INTERMEDIARY = 72, //'820a79ce-ab81-4443-b2e7-be288d896288',
  TRADER = 88, //'d8211d4c-df01-4b8c-8ed4-e93c72c32a3e',
  LIMITED_TRADER = 74, //'45299cf8-e183-4477-96d8-be6ba1adb3bc',
  LIMITED_INTERMEDIARY = 9, //'1cd53294-648a-41ef-b97a-17aac774081a',
}

export enum LookupType {
  CUSTOMER_TYPE = 1,
  MEMBER_CATEGORY = 2,
  REPRESENTATIVE_TYPE = 3,
  ORGANIZATION_TYPE = 4,
  BUSINESS_TYPE = 5,
  GENDER_TYPE = 6,
  CUSTOMER_STATUS = 7,
  IDENTITY_TYPE = 8,
  SERVICE_STATUS = 9,
  EDUCATIONAL_LEVEL = 10,
  WORKFLOW_DECISION_TYPE = 11,
  CANCELLATION_REASON = 12,
  VIOLATION_REASION = 13,
  VIOLATION_TYPE = 14,
  DATA_CHANGE_TYPE = 15,
  CASE_TYPE = 16,
  DEPARTMENT_TYPE = 17,
  COURT_APPOINTMENT_TYPE = 18,
  COURT_DECISION_TYPE = 19,
  INJUNCTION_REASONS = 21,
  INJUNCTION_BODY_TYPE = 22,
  OVERSIGHT_REPORT_DECISION_TYPES = 23,
  CLIENT_TYPE = 25,
  REASONtYPE = 29,
  MANAGER_TYPES = 24,
  OVERSIGHT_FOLLOWUP_TYPES,
  TRADE_NOT_ACCOMPLISHED_REASON = 33,
}

export enum NetWorthCapital {
  NON_MEMBER_DIRECT_TRADER = 250000,
  MEMBER_INTERMEDIARY = 1000000,
  MEMBER_TRADER = 500000,
}

export enum LookupType2 {
  SERVICE_TYPE = "4A0552A2-159F-4E48-9EC6-B6F3F07160D9",
  SERVICE_STATUS = "5602F5AF-C75D-495A-A44D-972DF9F81D4F",
  BUSINESS_TYPES = "36412CCA-FB12-41F3-B8F4-2DE2CD479A83",
  EDUCATIONAL_LEVEL = "623A415D-AC86-43D1-8EF8-9AB55529B785",
  OWNERSHIP_TYPES = "",
  ORGANIZATION_TYPE = "1C8B4841-48F1-4A7B-920F-04C510E605AE",
  CUSTOMER_TYPE = "ADF0D101-B48B-437B-A7CC-0F1A1EDCF58C",
  MEMBER_CATEGORY = "D5AC6D0E-8962-4BCC-85D0-0AC82E5EBEB7",
  CUSTOMER_STATUS = "BF4B08EF-5B2B-4A8A-89B4-7B6DE5771774",
}

export enum DataChangeTypes {
  ORGANIZATION_DATA_CHANGE = 100,
  OWNER_MANAGER_DATA_CHANGE = 94,
  REPRESENTATIVE_CHANGE = 101,
  OWNER_MANAGER_ADDRESS_DATA_CHANGE = 78,
  ORGANIZATION_ADDRESS_DATA_CHANGE = 37,
  SISTER_COMPANY_DATA_CHANGE = 102,
}

export enum paymentType {
  CASH = 1,
  CHECK = 2,
}

export enum REPRSENTATIVE_TYPE {
  FLOOR_TRADE_REPRSENTATIVE = 71,
  ELECTROINC_AUCTION_TRADE_REPRESENTATIVE = 60,
  ELECTRONIC_TRADE_REPRESENTATIVE = 87,
}

export enum EXCHANGE_ACTOR_STATUS {
  ACTIVE = 20,
  CANCELLED = 64,
  UNDER_INJUNCTION = 31,
  // PRE_CANCELLATION_INJUNCTION = 4,
  Injunction_Draft_state = 114,
}

export enum TradeExcutionViolationRecord {
  VIOLATIONREASON = 13,
  VIOLATIONTYPE = 14,
}
export enum oversightReportStatus {
  Started = 114,
}

export enum MangerType {
  OWNER = 117,
  REPRESENTATIVE = 118,
  EMPLOYEE = 119,
}
