import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/api/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-layout.html',
  styleUrls: ['./login-layout.scss']
})
export class LoginComponentLayout {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  public login() {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        const token = response.token;
        this.authService.saveToken(token);
        this.router.navigate(['/home']);
      },
      error: err => {
        alert('Usuário ou senha inválidos!');
        console.error(err);
      }
    });
  }
}