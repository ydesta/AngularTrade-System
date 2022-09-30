export enum ServiceApplicationStatus {
  NEW = 26,
  DRAFTED = 17,
  FINISHED = 70,
  APPROVED = 67,
  SEND_FOR_PAYMENT = 28,
  PAID = 45,
  SEND_FOR_APPROVAL = 66,

}

export enum ServiceApplicationStep {
  GENERALE_INFORMATION = 0,
  SITER_COMPANY = 1,
  OWNER = 2,
  GENERAL_MANAGER = 3,
  PREREQUSIETE = 4,
  PAYMENT = 5,
  CERTEFICATE = 6
}

export enum RenewalServiceApplicationStep {
  GENERALE_INFORMATION = 0,
  PREREQUSIETE = 1,
  PAYMENT = 2,
  CERTEFICATE = 3
}

export enum Navigation {
  FORWARD = 0,
  BACKWARD = 1
}

export enum PaymentServiceApplicationStep {
  PAYMENT_ORDER = 0,
  RECEIPT = 1,
}

export enum OversightFollowupDecisionTypes {
  GO_AHEAD = 116,
  SEND_TO_LAW_ENFORCEMENT = 110,
  ORAL_WARNIGN = 108,
  WRITTEN_LETTER_WARNIGN = 109,
  NO_DECISION = 114
}

