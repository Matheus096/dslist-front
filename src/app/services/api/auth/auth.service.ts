import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModel } from '../../../core/models/auth-resp-user/auth-resp-user.model';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: number;
  sub: string;
  exp: number;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Envia requisição de login com username e password no body
  login(username: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.apiUrl + '/login', { username, password });
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

  // pegar userId do token JWT
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Token decodificado:", decoded);
      return decoded.userId;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }
}