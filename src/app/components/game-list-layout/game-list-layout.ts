import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list-layout',
  standalone: true,
  templateUrl: './game-list-layout.html',
  styleUrls: ['./game-list-layout.scss'],
  imports: [CommonModule],
})
export class GameListLayoutComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe(data => {
      this.games = data;
    });
  }

  goToHome() {
    this.router.navigate(['/home']); // redireciona para a rota /home
  }
}