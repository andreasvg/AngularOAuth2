import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Constants } from '../constants';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      const accessToken = this.authService.getAccessToken();
      const headers = req.headers.set('Authorization', `Bearer ${accessToken}`);
      const authReq = req.clone({ headers });
      return next.handle(authReq)
                  .pipe(tap(event => {
                    if (event instanceof HttpErrorResponse) {
                      const respErr = event as HttpErrorResponse;
                      if (respErr && (respErr.status === 401 || respErr.status === 403)) {
                        this.router.navigate(['/unauthorised']);
                      }
                    }
                  }));
    } else {
      return next.handle(req);
    }
  }
}
