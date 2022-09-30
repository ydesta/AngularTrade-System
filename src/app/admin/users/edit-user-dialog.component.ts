import { AfterViewInit, Component, Inject, NgModule, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { User } from 'src/@custor/models/user.model';
import { Role } from 'src/@custor/models/role.model';

import { UserEditorComponent } from './user-editor.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { locale as langEnglish } from '../lang/et';
import { locale as langEthiopic } from '../lang/en';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { AuthService } from "src/@custor/services/security/auth.service";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: 'edit-user-dialog.component.html',
  styleUrls: ['edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements AfterViewInit {
  @ViewChild(UserEditorComponent, { static: true })
  editUser: UserEditorComponent;

  get userName(): any {
    return this.data.user ? { name: this.data.user.UserName } : null;
  }

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private configService: ConfigurationService,
    private translationService: TranslateService,
    private authservice: AuthService,
    private translationLoaderService: TranslationLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, roles: Role[],isStaff:boolean }) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
 
  }

  ngAfterViewInit() {
    this.editUser.userSaved$.subscribe(user => this.dialogRef.close(user));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
