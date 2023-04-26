import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data: LoginRequest) {
    const url = 'https://reqres.in/api/login';
    return this.http.post<LoginResponse>(url, data);
  }
}
