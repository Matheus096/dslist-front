import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/api/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-layout.html',
  styleUrls: ['./register-layout.scss']
})
export class RegisterComponentLayout {

  username: string = '';
  password: string = '';
  email: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  private formatErrorMessage(err: any): string {
    let body = err.error;

    // Converte string JSON para objeto se necessário
    if (typeof body === 'string') {
      try { 
        body = JSON.parse(body); 
      } catch { 
        return body || "Erro desconhecido"; 
      }
    }

    if (Array.isArray(body)) {
      return body.map(e => e.message).join('\n');
    }

    return body?.message || body || "Erro inesperado ao processar requisição.";
  }

  public register() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (res) => {
        alert(res);
        this.router.navigate(['/login']); // redireciona para login após registrar
      },
      error: (err) => {
        const errorMessage = this.formatErrorMessage(err);
        alert(`Erro ao registrar: ${errorMessage}`);
      }
    });
  }
}