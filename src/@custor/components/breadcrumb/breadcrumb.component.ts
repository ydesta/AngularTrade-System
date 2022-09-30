import { Component, Input } from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
 })
export class BreadcrumbComponent {
    @Input()
    title: string;
    currentLang = '';
  constructor(private configService: ConfigurationService) {
    this.currentLang = this.configService.language;
  }
}
