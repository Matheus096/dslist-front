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
  }

  goToGames() {
    this.router.navigate(['/games']); // redireciona para a rota /games
  }
}