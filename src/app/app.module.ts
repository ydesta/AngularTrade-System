import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { routing } from './app.routing';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './common/constants/consts';
import { LangSwitcherModule } from 'src/@custor/components/lang-switcher/lang-switcher.component';
import { AuthService } from 'src/@custor/services/security/auth.service';
import { GlobalErrorHandler } from './common/error/global-error-handler';
import { http_interceptor } from './common/error/http_interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
    MatSnackBarModule, // remove this one
    routing,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatToolbarModule,
    LangSwitcherModule,
    // MatMenuModule, // remove this one
    MatDialogModule // remove this one
  ],
  providers: [
    AuthService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: http_interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
