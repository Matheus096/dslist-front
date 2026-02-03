import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  public goToGamesStore() {
    this.router.navigate(['/games-store']);
  }

  public goToGames() {
    this.router.navigate(['/games']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(termo: string) {
    this.router.navigate(['/games'], { 
      queryParams: { search: termo },
      relativeTo: this.route, 
      queryParamsHandling: 'merge'
    });
  }
}