import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  templateUrl: './home-layout.html',
  styleUrls: ['./home-layout.scss']
})
export class HomeComponentLayout {
  constructor(private router: Router) {}

  goToGames() {
    this.router.navigate(['/games']); // redireciona para a rota /games
  }

  title() {
    return 'DSList!';
  }
}