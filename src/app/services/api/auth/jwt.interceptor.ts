import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const publicRoutes = ['/auth/login', '/auth/register'];

    if (publicRoutes.some(route => req.url.includes(route))) {
      return next.handle(req);
    }

    const token = this.auth.getToken();

    // 🔹 Teste: log para verificar se o interceptor está sendo chamado
    // console.log('JwtInterceptor chamado!');
    // console.log('URL da requisição:', req.url);
    // console.log('Token atual:', token);

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}