import {
  NgxUiLoaderConfig,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from "ngx-ui-loader";

export const MARITAL_STATUSES: any[] = [
  { Id: "1", Description: "ያላገባ", DescriptionEnglish: "Single" },
  { Id: "2", Description: "ያገባ", DescriptionEnglish: "Married" },
  { Id: "3", Description: "የፈታ", DescriptionEnglish: "Divorced" },
];
export const GENDERS: any[] = [
  { Id: 1, Description: "ወንድ", DescriptionEnglish: "Male" },
  { Id: 2, Description: "ሴት", DescriptionEnglish: "Female" },
];
export const PAYMENT_TYPE: any[] = [
  { Id: 1, Description: "በጥሬ ገንዘብ", DescriptionEnglish: "Cash" },
  { Id: 2, Description: "በቼክ", DescriptionEnglish: "Check" },
];

export const IDENTITY_TYPE: any[] = [
  { Id: 1, Description: "የፓስፖርት ቁጥር", DescriptionEnglish: "Passport Number" },
  {
    Id: 2,
    Description: "የቀበሌ መታወቅያ ቁጥር ",
    DescriptionEnglish: "Kebele Id Number",
  },
  {
    Id: 3,
    Description: "የመንጃ ፈቃድ ቁጥር",
    DescriptionEnglish: "Driving Licence Number",
  },
];
export const TITLES: any[] = [
  { Id: "1", Description: "አቶ", DescriptionEnglish: "Mr" },
  { Id: "2", Description: "ወ/ሮ", DescriptionEnglish: "Mrs" },
  { Id: "3", Description: "ወ/ሪት", DescriptionEnglish: "Miss" },
  { Id: "4", Description: "ዶ/ር", DescriptionEnglish: "Dr" },
];

export const LEGAL_STATUSES: any[] = [
  { Id: "1", Description: "ግለሰብ", DescriptionEnglish: "Sole Proprietorship" },
  {
    Id: "2",
    Description: "ኃላፊነቱ የተወሰነ የግል ኩባንያ",
    DescriptionEnglish: "Private Limited Company",
  },
  { Id: "3", Description: "የአክስዮን ማህበር", DescriptionEnglish: "Share Company" },
  {
    Id: "4",
    Description: "የመንግስት ተቋም",
    DescriptionEnglish: "Public Enterprise",
  },
  {
    Id: "5",
    Description: "የስራ ማህበራት",
    DescriptionEnglish: "Cooperative Society",
  },
];
export const STATUS: any[] = [
  { Id: "0", Description: "በስራ ላይ", DescriptionEnglish: "Active" },
  { Id: "1", Description: "የተዘጋ", DescriptionEnglish: "Closed" },
];

export const NEW_RECOGNITION_STEPS: any[] = [
  { GENERAL_INFORMATION: 0, Label: "exchangeActor.management.Header" },
  { SISTER_COMPANY: 1, Label: "sisterCompany.management.SisterCompany" },
  { OWNER_MANAGER: 2, Label: "ownerManagerRegistration.management.Header" },
  { OWNER: 3, Label: "ownerManagerRegistration.management.Header" },
  { PREREQUISITE: 4, Label: "servicePrerequisite.management.Header" },
  { PAYMENT_AUTHORIZE: 5, Label: "servicePayment.management.Header" },
  { CERTIFICATE: 6, Label: "certificate.management.Header" },
];

export const RECOGNITION_CANCELLATION_STEPS: any[] = [
  { GENERAL_INFORMATION: 0, Label: "cancellation.management.Header" },
  { PREREQUISITE: 1, Label: "servicePrerequisite.management.Header" },
];

export const RECOGNITION_RENEWAL_STEPS: any[] = [
  { GENERAL_INFO: 0, Label: "exchangeActor.management.Header" },
  { PREREQUISITE: 1, Label: "servicePrerequisite.management.Header" },
  { PAYMENT_AUTHORIZE: 2, Label: "servicePayment.management.Header" },
  { CERTIFICATE: 3, Label: "certificate.management.Header" },
];

export const REPRESENTATIVE_CHANGE_STEP: any[] = [
  { GENERAL_INFO: 0, Label: "exchangeActor.management.Header" },
  { PREREQUISITE: 1, Label: "servicePrerequisite.management.Header" },
  { CERTIFICATE: 2, Label: "servicePayment.management.Header" },
  { CERTIFICATE: 3, Label: "certificate.management.Header" },
];

export const PAYMENT_SERVICE_STEPS: any[] = [
  { PAYMENT_ORDER_LIST: 0 },
  { RECEIPT: 1 },
];

export const ServiceTypes: any[] = [
  {
    Id: 1,
    Path: "/main/recognition/registration",
    Name: "service.Name.Recognition.New",
  },
  {
    Id: 3,
    Path: "/main/recognition/cancellation",
    Name: "service.Name.Recognition.Cancel",
  },
  {
    Id: 2,
    Path: "/main/recognition/renewal",
    Name: "service.Name.Recognition.Renew",
  },
  {
    Id: 4,
    Path: "/main/recognition/replacement",
    Name: "service.Name.Recognition.Replace",
  },
  {
    Id: 5,
    Path: "/main/recognition/representative-change",
    Name: "service.Name.Recognition.RepresentativeChange",
  },
  {
    Id: 6,
    Path: "/main/recognition/renewal",
    Name: "service.Name.Recognition.Renew",
  },
];

export const ApprovalStatus: any[] = [
  { Id: 0, Subject: "status.WaitingTeamLeaderApproval" },
  { Id: 1, Subject: "status.WaitingDepartmentDirectorApproval" },
  { Id: 2, Subject: "status.WaitingDepartmentDirectorApproval" },
  { Id: 4, Subject: "status.WaitingOfficerCorrection" },
  { Id: 5, Subject: "status.WaitingTeamLeaderCorrection" },
  { Id: 6, Subject: "status.WaitingDepartmentDirectorCorrection" },
  { Id: 3, Subject: "status.WaitingSendToLawEnforcementDepartment" },
  { Id: 7, Subject: "status.WaitingOfficerApproval" },
];

export const WorkFlowDecisionType: any[] = [
  { Id: 48, DescriptionEng: "Approved", Description: "ፅድቆዋል" },
  { Id: 47, DescriptionEng: "Reject", Description: "ውድቅ ተደርጎዋል" },
];

export const PAYMENT_STATUS: any[] = [
  { Id: "1", Description: "የተከፈለ", DescriptionEng: "Paid" },
  { Id: "2", Description: "ያልተከፈለ", DescriptionEng: "Not Paid" },
];

export const SERVICE_STATUS: any[] = [
  { Id: "2", Description: "ረቂቅ", DescriptionEng: "Drafted" },
  { Id: "3", Description: "ያለቀ", DescriptionEng: "Finished" },
];

const ALPHABET_WITHSPACE_REGEX = new RegExp(/^[a-zA-Z ]+$/);
const ALPHABET_WITHNUMERIC_REGEX = new RegExp(/^[\n.,0-9,a-zA-Z ]+$/);
const ALPHABET_REGEX = new RegExp(/^[a-zA-Z]+$/);
const NUMERIC_WITHPERIOD_REGEX = new RegExp(/^[0-9.]+$/);
const NUMERIC_REGEX = new RegExp(/^[0-9]+$/);
const ET_ALPHABET_WITHSPACE_REGEX = new RegExp(
  /^([ \n,0-9\W \u1200-\u137F])+$/
);
const ET_ALPHABET_REGEX = new RegExp(/^([ \n.,0-9\u1200-\u137F \u0008 ][/])+$/);
const ET_ALPHABET_WITHSPACE_QUESTION_REGEX = new RegExp(
  /^([ \u1200-\u137F]+\?)+$/
);
const ALPHABET_WITHSPACE_QUESTION_REGEX = new RegExp(/^[a-zA-Z ]+\?+$/);
const EMAIL_VALIDATOR = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/
);
const PHONE_VALIDATOR = new RegExp(
  /^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{10}$/
);
const ALPHABET_WITHNEWLINE_REGEX = new RegExp(/^[\n.,0-9\W a-zA-Z ]+$/);
const ET_ALPHABET_WITHNEWLINE_REGEX = new RegExp(
  /^([\n,0-9\W \u1200-\u137F])+$/
);
const ALPHABET_WITHSPACEBACKSLASH_REGEX = new RegExp(/^([a-zA-Z ][/]?)+$/);
const ET_ALPHABET_WITHSPACEBACKSLASH_REGEX = new RegExp(
  /^([ \u1200-\u137F][/]?)+$/
);
const ALPHABET_WITHSPAC_EBACKSLASH__REGEX = new RegExp(
  /^([[a-zA-Z ][/]?[.]?)+$/
);

// const ALPHABET_WITHSPACE_REGEX = new RegExp(/^[a-zA-Z ]+$/);
// const ALPHABET_WITHSPACEBACKSLASH_REGEX = new RegExp(/^([a-zA-Z ][/]?)+$/);
// const ALPHABET_WITHNEWLINE_REGEX = new RegExp(/^[\n.,0-9\W a-zA-Z ]+$/);
// const ALPHABET_WITHSPACE_QUESTION_REGEX = new RegExp(/^[a-zA-Z ]+\?+$/);
// const ALPHABET_REGEX = new RegExp(/^[a-zA-Z]+$/);
// const NUMERIC_WITHPERIOD_REGEX = new RegExp(/^[0-9.]+$/);
// const NUMERIC_REGEX = new RegExp(/^[0-9]+$/);
// const ET_ALPHABET_WITHSPACE_REGEX = new RegExp(/^([ \u1200-\u137F])+$/);
// const ET_ALPHABET_WITHSPACEBACKSLASH_REGEX = new RegExp(/^([ \u1200-\u137F][/]?)+$/);
// const ET_ALPHABET_WITHNEWLINE_REGEX = new RegExp(/^([\n,0-9\W \u1200-\u137F])+$/);
// const ET_ALPHABET_WITHSPACE_QUESTION_REGEX = new RegExp(/^([ \u1200-\u137F]+\?)+$/);
// const ET_ALPHABET_REGEX = new RegExp(/^([\u1200-\u137F\u0008])+$/);
// const ET_EN_ALPHABET_WITH_REGEX = new RegExp(/^([ \u1200-\u137F]|[a-zA-Z ])+$/);
// const ET_EN_ALPHABET_WITH_BACKWARD_SLASH_REGEX = new RegExp(/^([^0-9]*)$/);
// const PASSWORD = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/);
// const EMAIL_VALIDATOR = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/);
// const PHONE_VALIDATOR = new RegExp(/^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{10}$/);

export {
  // ET_ALPHABET_WITHSPACE_REGEX2,
  // ALPHABET_WITHSPACE_REGEX2,
  ET_ALPHABET_WITHSPACEBACKSLASH_REGEX,
  ALPHABET_WITHSPACEBACKSLASH_REGEX,
  ALPHABET_WITHNUMERIC_REGEX,
  ALPHABET_WITHSPACE_REGEX,
  ALPHABET_WITHSPACE_QUESTION_REGEX,
  ALPHABET_WITHNEWLINE_REGEX,
  ET_ALPHABET_WITHSPACE_QUESTION_REGEX,
  ALPHABET_WITHSPAC_EBACKSLASH__REGEX,
  ALPHABET_REGEX,
  NUMERIC_WITHPERIOD_REGEX,
  NUMERIC_REGEX,
  ET_ALPHABET_WITHNEWLINE_REGEX,
  EMAIL_VALIDATOR,
  PHONE_VALIDATOR,
  ET_ALPHABET_WITHSPACE_REGEX,
  ET_ALPHABET_REGEX,
};
export const PHONE_NO = new RegExp(/^[+251]*[0-9]*$/);
export const EMAIL = new RegExp(/\S+@\S+\.\S+/);

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#349f92",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 50,
  pbColor: "#349f92",
  bgsType: SPINNER.ballSpinClockwise, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  fgsColor: "#349f92",
  blur: 5,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

export const TRADETYPE: any[] = [
  { Id: 1, Description: "ግዥ", DescriptionEnglish: "Buyer" },
  { Id: 2, Description: "ሽያጭ", DescriptionEnglish: "Seller" },
];
export const TRADEEXCUTIONREPORT: any[] = [
  { Id: 1, Description: "ለራሱ", DescriptionEnglish: "For Himself" },
  {
    Id: 2,
    Description: "ለደንበኞቹ",
    DescriptionEnglish: "For Its Customers",
  },
];
export const TRADENOTACCOMPLISHED: any[] = [
  { Id: 1, Description: "ለራሱ", DescriptionEnglish: "For Himself" },
  { Id: 2, Description: "ለደንበኞቹ", DescriptionEnglish: "For Its Customers" },
  { Id: 3, Description: "ለሁለቱም", DescriptionEnglish: "For Both" },
];
export const ISTRADENOTACCOMPLISHED: any[] = [
  {
    Id: 1,
    Description: "አዎ ተፈፅመዋል",
    DescriptionEnglish: "Trade Execution Accomplished",
  },
  {
    Id: 2,
    Description: "አልተፈፀመም",
    DescriptionEnglish: "Trade Execution Not Accomplished",
  },
];
export const DOYOUHAVENEWCLIENT: any[] = [
  { Id: 1, Description: "ደንበኛ አለኝ", DescriptionEnglish: "Yes I Have Client" },
  {
    Id: 2,
    Description: "ደንበኛ የለኝም",
    DescriptionEnglish: "No I Have Not Client",
  },
];
export const CLIENTSTATUS: any[] = [
  { Id: 1, Description: "በስራ ላይ", DescriptionEnglish: "Active" },
  { Id: 2, Description: "ውሉ ተቋርጠዋል", DescriptionEnglish: "Terminated" },
  { Id: 3, Description: "እየሰራን አይደለንም", DescriptionEnglish: "Passive" },
];
export const REPORTPERIOD: any[] = [
  { Id: "1", Description: "የሩብ ዓመት ", DescriptionEnglish: "Quarterly" },
  { Id: "2", Description: "የዓመት ", DescriptionEnglish: "Year" },
];
export const WAREHOUSE: any[] = [
  { Id: "1", Description: " አዲስ አባበ ", DescriptionEnglish: "Addisabeba" },
  { Id: "2", Description: "ድሬዳዋ  ", DescriptionEnglish: "Diredawa" },
  { Id: "3", Description: "ጅማ  ", DescriptionEnglish: "Jima" },
];
export const AUDITORS: any[] = [
  {
    Id: "1",
    Description: " ዮሴፍ ሂሳብ አዋቂ ",
    DescriptionEnglish: "Yosef Accountat Expert",
  },
];
export const MEMBERCATEGORY: any[] = [
  { Id: 72, Description: " አገናኝ ", DescriptionEnglish: "Intermediary" },
  { Id: 88, Description: "ተገበያይ  ", DescriptionEnglish: "Trader" },
  { Id: 90, Description: "ቀጥታ ተገበያይ  ", DescriptionEnglish: "Direct Trader" },
];
export const FINANCIALPERFORMANCE: any[] = [
  {
    Id: 500000,
    Description: "ከ 500000 በታች ያላቸው አባላት",
    DescriptionEnglish: "Less than 500000",
  },
  {
    Id: 1000000,
    Description: "ከ 1000000 በታች ያላቸው አባላት  ",
    DescriptionEnglish: "Less than 1000000",
  },
];
export const MEMBERTYPE: any[] = [
  { Id: "Member", Description: "አባላት", DescriptionEnglish: "Member" },
  { Id: "Client", Description: "ደንበኞች", DescriptionEnglish: "Client" },
  {
    Id: "Non-Members",
    Description: "አባል ያልሆኑ ቀጥታ ተገበያይ",
    DescriptionEnglish: "Non-Members",
  },
];
export const ACCOUNTTYPE: any[] = [
  { Id: "Pay-Out", Description: "የክፍያ ማስተላለፍያ", DescriptionEnglish: "Pay-Out" },
  { Id: "Pay-In", Description: "የክፍያ መቀበያ ", DescriptionEnglish: "Pay-In" },
];
export const EXCHANGEACTORWARNINGSTATUS: any[] = [
  {
    Id: 0,
    Description: " እርምጃ አልተወሰደም ",
    DescriptionEnglish: "ማስጠንቀቅያ አልተሰጠውም",
  },
  { Id: 1, Description: "እርምጃ ተወስደዋል  ", DescriptionEnglish: "ማስጠንቀቅያ ተሰጥቶታል" },
];
export const EACHANGEACTORTYPE: any[] = [
  { Id: 72, Description: " አገናኝ ", DescriptionEnglish: "Intermediary" },
  { Id: 88, Description: "ተገበያይ  ", DescriptionEnglish: "Trader" },
  { Id: 90, Description: "ቀጥታ ተገበያይ  ", DescriptionEnglish: "Direct Trader" },
  { Id: 5, Description: "ኦዲተር  ", DescriptionEnglish: "Independent Auditor" },
];
