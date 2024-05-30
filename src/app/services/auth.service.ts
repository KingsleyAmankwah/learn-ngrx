import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginPayload, RegisterPayload, User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private baseURL = `/auth`;

  // authenticate() {
  //   const context = new HttpContext().set(REFRESH_TOKEN, true);
  //   return this.http.get<GetAuthCheck>(`${this.baseURL}/check`, { context });
  // }

  login(credentials: LoginPayload) {
    return this.http.post<User>(`${this.baseURL}/login`, credentials);
  }

  register(newUser: RegisterPayload) {
    return this.http.post<User>(`${this.baseURL}/register`, newUser);
  }

  logout() {
    return this.http.post<void>(`${this.baseURL}/logout`, {});
  }

  // loginWithGoogle(id_token: string) {
  //   return this.http.post<AuthLoginWithGoogle>(`${this.baseURL}/google`, { id_token });
  // }
}
