import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { RoleEditorComponent } from './role-editor.component';
import { Role } from 'src/@custor/models/role.model';
import { Permission } from 'src/@custor/models/permission.model';
import { AccountService } from 'src/@custor/services/security/account.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { locale as langEnglish } from '../lang/et';
import { locale as langEthiopic } from '../lang/en';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: 'edit-role-dialog.component.html',
    styleUrls: ['edit-role-dialog.component.scss']
})
export class EditRoleDialogComponent implements AfterViewInit {
    @ViewChild(RoleEditorComponent, { static: false })
    roleEditor: RoleEditorComponent;

    get roleName(): any {
        return this.data.role ? {name:this.data.role.Name }: null;

    }

    constructor(
        public dialogRef: MatDialogRef<RoleEditorComponent>,
        private configService: ConfigurationService,
        private translationService: TranslateService,
        private translationLoaderService: TranslationLoaderService,
        @Inject(MAT_DIALOG_DATA) public data: { role: Role, allPermissions: Permission[] },
        private accountService: AccountService
    ) {
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    }

    ngAfterViewInit() {
        this.roleEditor.roleSaved$.subscribe(role => this.dialogRef.close(role));
    }

    cancel(): void {
        this.dialogRef.close(null);
    }

    get canManageRoles() {
        return this.accountService.userHasPermission(Permission.manageRolesPermission);
    }
}
