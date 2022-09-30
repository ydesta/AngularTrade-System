import { CustomerService, CustomerServiceData } from './customer-services.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/@custor/services/security/auth.service';
import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "src/@custor/services/configuration.service";
@Component({
  selector: "app-our-services",
  templateUrl: "./our-services.component.html",
  styleUrls: ["./our-services.component.scss"],
})

export class OurServicesComponent implements OnInit {
  services: CustomerServiceData[] = [];
  currentLang: string;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthService,
    private configService: ConfigurationService
  ) {
    this.currentLang = this.configService.language;
  }

  ngOnInit() {
    this.getServices(this.currentLang);
  }

  getServices(currentLang) {
    let service: CustomerServiceData = new CustomerServiceData();
    this.customerService.getServiceList().forEach((ser) => {
      service = {
        ServiceId: ser.ServiceId,
        Title: currentLang === "et" ? ser.Title : ser.TitleEnglish,
        Desc: currentLang === "et" ? ser.DescAmh : ser.Desc,
        Icon: ser.Icon,
        Path: ser.Path,
      };
      this.services.push(service);
    });
  }

  goService(id: any, path: any) {


    /*
     try just route no more other code
    */
    // this.router.navigateByUrl(path);
    // if (!this.autservice.isLoggedIn) {
    //   this.router.navigate(["/auth/login"]);
    // } else {
      
      if (id === 4) {
        this.router.navigate(["/main/registertrade/member-client-trade"]);
      }
    // }
  }
  redirectUser(){
    if(this.authService.isLoggedIn){
      this.router.navigate(['/main'])
    }else {
      this.router.navigate(['/auth/login'])
    }
  }
}
