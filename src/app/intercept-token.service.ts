import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService {

  constructor(private auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('spotify.com')) {
      const token = this.auth.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
