import { Injectable, Input } from '@angular/core';

export class CustomerServiceData {
  public ServiceId: number;
  public Desc: string;
  public Title: string;
  public Path: string;
  public Icon: string;
}
export const CUSTOMER_SERVICE: any[] =
[
    // {
    //   ServiceId: 1,
    //   Title: 'የግብይት ተሳታፊዎች እውቅና እና ቁጥጥር',
    //   TitleEnglish: 'Market Actors Recognition and Oversight',
    //   Desc: 'This module is used to maintain database of all market actors and mange periodic oversight tasks',
    //   DescAmh: 'የግብይት ተሳታፊዎች እውቅና እና ቁጥጥር',
    //   Icon:'card_membership',
    //   Path: 'main/recognition'
    // },
    {
      ServiceId: 1,
      Title: 'የግብይት ተሳታፊዎች ክትትል',
      TitleEnglish: 'Exchange Actors Oversight',
      Desc: 'Off-Site Monitoring',
      DescAmh: 'የቢሮ ክትትል',
      Icon:'card_membership',
      Path: 'main/registertrade'
    },
    // {
    //   ServiceId: 3,
    //   Title: 'ህግ ማስክበር',
    //   TitleEnglish: 'Law Enforcement',
    //   Desc: '',
    //   DescAmh: 'ህግ ማስክበር',
    //   Icon:'people',
    //   Path: 'main/law-enforcement'
    // },
    // {
    //   ServiceId: 4,
    //   Title: 'አስተዳደራዊ ችሎት',
    //   TitleEnglish: 'Adminstrative Tribunal',
    //   Desc: '',
    //   DescAmh: 'አስተዳደራዊ ችሎት',
    //   Icon:'local_library',
    //   Path: 'main/administrative-tribunal'
    // },
    // {
    //   ServiceId: 5,
    //   Title: 'የገቢያ ክትትል እና ቁጥጥር',
    //   TitleEnglish: 'Market Actors Trading Activities Monitoring',
    //   Desc: '',
    //   DescAmh: 'የገቢያ ክትትል እና ቁጥጥር',
    //   Icon:'check_circle',
    //   Path: '/main/oversight-report'
    // },
    // {
    //   ServiceId: 6,
    //   Title: 'የክፍያ አስተዳደር',
    //   TitleEnglish: 'Market Actors Trading Activities Monitoring',
    //   Desc: 'Used to manage the periodic market actors trading activities off-site monitoring',
    //   DescAmh: 'የክፍያ አስተዳደር',
    //   Icon:'monetization_on',
    //   Path: '/main/service-payment'
    // }
  ];

@Injectable()
export class CustomerService {

  constructor() { }

  getServiceList() {
    return CUSTOMER_SERVICE;
  }
}
