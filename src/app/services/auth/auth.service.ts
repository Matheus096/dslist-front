import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Envia requisição de login com username e password no body
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', { username, password });
  }

  // Envia requisição de registro com username e password no body
  register(username: string, password: string) {
    return this.http.post(this.apiUrl + '/register', { username, password }, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}