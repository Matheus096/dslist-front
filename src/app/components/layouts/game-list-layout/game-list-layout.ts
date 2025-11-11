import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game';
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
  userId = 1; // (Exemplo) futuramente pode vir do AuthService

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames(3); // carrega jogos da lista com ID 3 por padrão (Todos)
  }

  goToHome() {
    this.router.navigate(['/home']); // redireciona para a rota /home
  }

  onListChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const listId = Number(target.value);

    this.loadGames(listId);
  }

  loadGames(listId: number): void {
    this.gameService.getGamesByUserAndList(this.userId, listId).subscribe({
      next: (data) => this.games = data,
      error: (err) => console.error('Erro ao carregar jogos:', err)
    });
  }
}