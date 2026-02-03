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

  public goToGames() {
    this.router.navigate(['/games']); // redireciona para a rota /games
  }

  public title() {
    return 'DSList!';
  }
}