import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './types/User';
import { RegisterUser } from './types/RegisterUser';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  public readToken(): any {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token!);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return helper.isTokenExpired(token) ? false : true;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }

  setToken(token: string): boolean {
    localStorage.setItem('access_token', token);
    return true;
  }

  logout(): boolean {
    localStorage.removeItem('access_token');
    return true;
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser);
  }
}
