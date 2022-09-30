import { RouteInfo } from "./route-interface";
import {
  SUPER_ADMIN,
  SITE_ADMIN,
  VIEW_ADMIN,
  MEMBER_DATA_OFFICER,
  DIRECT_TRADING_DATA_OFFICER,
  AUDITOR_DATA_OFFICER,
} from "src/app/common/constants/permissionConsts";
export const CUSTOMER_ROUTES: RouteInfo[] = [
  {
    path: "/",
    title: "mainMenu.Home",
    type: "link",
    userType: [
      MEMBER_DATA_OFFICER,
      DIRECT_TRADING_DATA_OFFICER,
      AUDITOR_DATA_OFFICER,
    ],
    iconType: "dashboard",
    children: [],
  },

  {
    path: "main/registertrade",
    title: "service.Name.RegisterTrade.Header",
    type: "dropDown",
    userType: [
      MEMBER_DATA_OFFICER,
      DIRECT_TRADING_DATA_OFFICER,
      AUDITOR_DATA_OFFICER,
    ],
    iconType: "group_work",
    children: [
      {
        path: "/main/registertrade/send-trade-execution",
        title: "service.Name.RegisterTrade.OffSite",
        type: "dropDown",
        userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
        iconType: "add_box",
        children: [
          {
            path: "/main/registertrade/register-trade-execution",
            title: "service.Name.RegisterTrade.New",
            type: "link",
            userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
            iconType: "add_shopping_cart",
            children: [],
          },
          {
            path: "/main/registertrade/member-auditor",
            title: "service.Name.RegisterTrade.MemberAuditor",
            type: "link",
            userType: [
              MEMBER_DATA_OFFICER,
              DIRECT_TRADING_DATA_OFFICER,
              AUDITOR_DATA_OFFICER,
            ],
            iconType: "group_add",
            children: [],
          },
          {
            path: "/main/registertrade/member-financial-auditor",
            title: "service.Name.RegisterTrade.AnnualAuditorReport",
            type: "link",
            userType: [
              MEMBER_DATA_OFFICER,
              DIRECT_TRADING_DATA_OFFICER,
              AUDITOR_DATA_OFFICER,
            ],
            iconType: "account_balance",
            children: [],
          },
        ],
      },
      {
        path: "/main/view-offsite-monitoring",
        title: "service.Name.RegisterTrade.SendAndSericeFollowUp",
        type: "dropDown",
        userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
        iconType: "verified_user",
        children: [
          {
            path: "/main/registertrade/send-trade-execution",
            title: "service.Name.RegisterTrade.New",
            type: "link",
            userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
            iconType: "add_shopping_cart",
            children: [],
          },
          {
            path: "/main/registertrade/annual-financial-auditor-list",
            title: "service.Name.RegisterTrade.AnnualAuditorReport",
            type: "link",
            userType: [
              MEMBER_DATA_OFFICER,
              DIRECT_TRADING_DATA_OFFICER,
              AUDITOR_DATA_OFFICER,
            ],
            iconType: "account_balance",
            children: [],
          },
        ],
      },
      {
        path: "/main/registertrade/send-trade-execution",
        title: "service.Name.RegisterTrade.UpdateInformation",
        type: "dropDown",
        userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
        iconType: "group",
        children: [
          {
            path: "/main/registertrade/update-client-information-profile",
            title: "service.Name.RegisterTrade.UpdateClientInfoList",
            type: "link",
            userType: [MEMBER_DATA_OFFICER],
            iconType: "contacts",
            children: [],
          },
        ],
      },
      {
        path: "/main/view-offsite-monitoring",
        title: "service.Name.RegisterTrade.ViewOffSite",
        type: "dropDown",
        userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
        iconType: "view_carousel",
        children: [
          {
            path: "/main/view-offsite-monitoring/self-trade-execution",
            title: "service.Name.RegisterTrade.TradeExcutionList",
            type: "link",
            userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
            iconType: "airplay",
            children: [],
          },
          {
            path: "/main/view-offsite-monitoring/financial-report-list",
            title: "service.Name.RegisterTrade.Financial",
            type: "link",
            userType: [MEMBER_DATA_OFFICER, DIRECT_TRADING_DATA_OFFICER],
            iconType: "whatshot",
            children: [],
          },
          {
            path: "/main/view-offsite-monitoring/view-annual-financial-report",
            title: "service.Name.RegisterTrade.AnnualFinancial",
            type: "link",
            userType: [
              MEMBER_DATA_OFFICER,
              DIRECT_TRADING_DATA_OFFICER,
              AUDITOR_DATA_OFFICER,
            ],
            iconType: "weekend",
            children: [],
          },
          {
            path: "/main/view-offsite-monitoring/currentmonth",
            title: "service.Name.RegisterTrade.currentMontthschedule",
            type: "link",
            userType: [
              MEMBER_DATA_OFFICER,
              DIRECT_TRADING_DATA_OFFICER,
              AUDITOR_DATA_OFFICER,
            ],
            iconType: "today",
            children: [],
          },
          {
            path: "/main/view-offsite-monitoring/renewal-notification",
            title: "service.Name.RegisterTrade.RenewalNotify",
            type: "link",
            userType: [
              MEMBER_DATA_OFFICER,
              DIRECT_TRADING_DATA_OFFICER,
              AUDITOR_DATA_OFFICER,
            ],
            iconType: "today",
            children: [],
          },
        ],
      },
    ],
  },
];
export const ACCOUNT_MENU: RouteInfo[] = [
  {
    path: "/main/about",
    userType: [SUPER_ADMIN, SITE_ADMIN, VIEW_ADMIN],
    title: "mainMenu.Settings",
    type: "link",
    iconType: "settings",
    children: [],
  },
];
