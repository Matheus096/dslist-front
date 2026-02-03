import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
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
  constructor(private authService: AuthService, private router: Router) {}

  public register() {
    this.authService.register(this.username, this.password).subscribe({
      next: (res) => {
        alert(res);
        this.router.navigate(['/login']); // redireciona para login após registrar
      },
      error: (err) => {
        alert(err.error);
      }
    });
  }
}