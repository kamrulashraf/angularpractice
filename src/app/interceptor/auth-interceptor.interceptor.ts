import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auththentication/services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const modifiedReq = request.clone({...request, 'headers' : headers});
    return next.handle(modifiedReq);
  }
}
