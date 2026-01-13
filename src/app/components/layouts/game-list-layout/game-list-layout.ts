import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list-layout',
  standalone: true,
  templateUrl: './game-list-layout.html',
  styleUrls: ['./game-list-layout.scss'],
  imports: [CommonModule, FormsModule],
})
export class GameListLayoutComponent implements OnInit {
  games: any[] = [];
  userId = 1; // (Exemplo) futuramente pode vir do AuthService

  // Para criar e editar
  newGameTitle = '';
  editingGame: any = null;

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

  // ---------- CREATE ----------
  createGame() {

    if (this.newGameTitle == ''){
      window.alert("O título do jogo não pode ser vazio!");
    }else{
      const body = { 
      title: this.newGameTitle,
      userId: this.userId
    };

    this.gameService.createGame(body).subscribe(() => {
      this.newGameTitle = '';
      this.loadGames(3);
    });
    }
  }

  // ---------- UPDATE ----------
  editGame(game: any) {
    const novoTitulo = prompt("Novo título:", game.title);
    if (!novoTitulo) return;

    const updated = { ...game, title: novoTitulo };

    this.gameService.updateGame(game.id, updated).subscribe(() => {
      this.loadGames(3);
    });
  }

  // ---------- DELETE ----------
  deleteGame(id: number) {
    this.gameService.deleteGame(id).subscribe(() => {
      this.loadGames(3);
    });
  }
}