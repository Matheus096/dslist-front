import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('dslist');

  constructor(private router: Router) {}

  goToGames() {
    this.router.navigate(['/games']); // redireciona para a rota /games
  }
}