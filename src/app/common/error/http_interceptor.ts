
import { AuthService } from 'src/@custor/services/security/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class http_interceptor implements HttpInterceptor {

    refreshTokenInProgress = false;

    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector, private router: Router,private authService:AuthService) {}

    refreshToken(): Observable<any> {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.refreshTokenInProgress = true;

            return this.authService.refreshLogin().pipe(
                tap(() => {
                    this.refreshTokenInProgress = false;
                    this.tokenRefreshedSource.next();
                }),
                catchError(error => {
          
                    this.refreshTokenInProgress = false;
                    this.logout();
                   return throwError(error);
                }));
        }
    }

    logout() {
     this.authService.logout();
     this.authService.redirectLogoutUser();
    }

    handleResponseError(error, request?, next?) {  
        
        if (error.status === 400) {
            // Show message
        }

        // Invalid token error
        else if (error.status === 401) {
            
            return this.refreshToken().pipe(
                switchMap(() => {

                    const newRequest = request.clone({
                        setHeaders: {
                          Authorization: `Bearer ${this.authService.accessToken}`,
                        }
                      });
              
                    return next.handle(newRequest);
                }),
                catchError(e => {
                    if (e.status !== 401) {
                        return this.handleResponseError(e);
                    } else {
                    }
                }));
        }

        // Access denied error
        else if (error.status === 403) {
            // Show message
            // Logout
           // this.logout();
        }

        // Server error
        else if (error.status === 500) {
            // Show message

        }

        // Maintenance error
        else if (error.status === 503) {
            // Show message
            // Redirect to the maintenance page
        }

        return throwError(error);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      // Handle request     
     
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.accessToken}`,
          }
        });

        // Handle response
        return next.handle(newRequest).pipe(catchError(error => {
            return this.handleResponseError(error, request, next);
        }));
    }
}