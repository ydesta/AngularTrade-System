import { RouteInfo } from "./route-interface";
import {
  SUPER_ADMIN,
  VIEW_ADMIN,
  VIEW_SETTING,
  MANAGE_SETTING,
  VIEW_USER,
  MANAGE_USER,
  MANAGE_ROLE,
  VIEW_ROLE,
} from "src/app/common/constants/permissionConsts";
export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "mainMenu.Home",
    iconType: "dashboard",
    userType: [SUPER_ADMIN, VIEW_ADMIN, VIEW_ROLE, MANAGE_ROLE],
    type: "link",
    children: [],
  },

  {
    path: "/admin/users",
    title: "mainMenu.Users",
    type: "link",
    iconType: "person",
    userType: [SUPER_ADMIN, VIEW_ADMIN, VIEW_USER, MANAGE_USER],
    children: [],
  },
  {
    path: "/admin/roles",
    title: "mainMenu.Roles",
    type: "link",
    iconType: "persons",
    userType: [SUPER_ADMIN, VIEW_ADMIN, VIEW_ROLE, MANAGE_ROLE],
    children: [],
  },
  {
    path: "/admin/Settings",
    title: "mainMenu.Settings",
    type: "dropDown",
    iconType: "settings",
    userType: [SUPER_ADMIN, VIEW_ADMIN, VIEW_SETTING, MANAGE_SETTING],
    children: [
      // {
      //   path: '/admin/settings/general',
      //   title: 'mainMenu.General',
      //   type: 'link',
      //   userType: [SUPER_ADMIN,VIEW_ADMIN,VIEW_SETTING,MANAGE_SETTING],
      //   iconType: 'fiber_new',
      //   children: [],

      // },
      {
        path: "/admin/settings/trade-execution",
        title: "mainMenu.TradeExceution",
        type: "link",
        userType: [SUPER_ADMIN, VIEW_ADMIN, VIEW_SETTING, MANAGE_SETTING],
        iconType: "bug_report",
        children: [],
      },
    ],
  },
  // {
  //   path: "/admin/Prerequisites",
  //   title: "mainMenu.Prerequisites",
  //   type: "dropDown",
  //   userType: [SUPER_ADMIN,VIEW_ADMIN,VIEW_SETTING,MANAGE_SETTING],
  //   iconType: "date_range",
  //   children: [
  //     {
  //       path: "/admin/prerequisite/list",
  //       title: "mainMenu.Prerequisites",
  //       type: "link",
  //       userType: [SUPER_ADMIN,VIEW_ADMIN,VIEW_SETTING,MANAGE_SETTING],
  //       iconType: "note_add",
  //       children: [],
  //     },
  //     {
  //       path: '/admin/prerequisite/servicepreprerequisite/assighnment',
  //       title: 'mainMenu.PrerequisitesAssignment',
  //       type: 'link',
  //       userType: [SUPER_ADMIN,VIEW_ADMIN,VIEW_SETTING,MANAGE_SETTING],
  //       iconType: 'edit',
  //       children: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'mainMenu.address',
  //   type: 'dropDown',
  //   userType: [SUPER_ADMIN],
  //   iconType: 'my_location',
  //   children: [
  //     {
  //       path: '/admin/address/region',
  //       title: 'mainMenu.Region',
  //       type: 'link',
  //       userType: [SUPER_ADMIN],
  //       iconType: 'location_city',
  //       children:[]
  //     },
  //     {
  //       path: '/admin/address/zone',
  //       title: 'mainMenu.Zone',
  //       type: 'link',
  //       userType: [SUPER_ADMIN],
  //       iconType: 'person_pin',
  //       children:[]

  //     },
  //     {
  //       path: '/admin/address/woreda',
  //       title: 'mainMenu.Woreda',
  //       type: 'link',
  //       userType: [SUPER_ADMIN],
  //       iconType: 'domain',
  //       children:[]
  //     },
  //     {
  //       path: '/admin/address/kebele',
  //       title: 'mainMenu.Kebele',
  //       type: 'link',
  //       userType: [SUPER_ADMIN],
  //       iconType: 'room',
  //       children:[]
  //     }
  //   ]
  // },
];
