import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/ui/theme-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('dslist');

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.initTheme();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      console.log('Token salvo pelo AppComponent!');

      window.history.replaceState({}, document.title, window.location.pathname); // Remove o token da URL após salvá-lo no localStorage

      // Agora que o token está no storage, o Guard vai deixar passar
      this.router.navigate(['/home']);
    }
  }

  goToGames() {
    this.router.navigate(['/games']); // redireciona para a rota /games
  }
}