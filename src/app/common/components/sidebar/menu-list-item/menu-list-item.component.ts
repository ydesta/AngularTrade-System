import {Component, Input, OnInit} from '@angular/core';
import {MatExpansionPanel} from '@angular/material';
import {Router} from '@angular/router';
import { NavItem } from '../model/NavItem';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss']
})
export class MenuListItemComponent implements OnInit {
  //panelOpenState = false;
  @Input() subMenu: NavItem;
  constructor(public router: Router) {
    this.subMenu =  {} as NavItem;
  }

  ngOnInit() {
  }

  canOpenExpansionPanel(panel: MatExpansionPanel, path: string) {
    // check if the path is found in the activated route so that it opens the expansion
    return this.router.url.includes(path);
  }
}
