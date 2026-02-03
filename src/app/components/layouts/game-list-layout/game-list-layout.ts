import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game/game';
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
  listId = 3; // (Exemplo) futuramente pode vir de uma box que o usuário selecione

  newGameTitle = ''; // Para criar e editar jogos

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames(this.listId); // carrega jogos da lista com ID 3 por padrão (Todos)
  }

  public goToHome() {
    this.router.navigate(['/home']); // redireciona para a rota /home
  }

  public onListChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const listId = Number(target.value);

    this.loadGames(listId);
  }

  private loadGames(listId: number): void {
    this.gameService.getGamesByUserAndList(this.userId, listId).subscribe({
      next: (data) => this.games = data,
      error: (err) => console.error('Erro ao carregar jogos:', err)
    });
  }


  
  // METODOS ABAIXO NAO ESTAO SENDO USADOS NO MOMENTO:
  // Criar novo jogo
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

  // Editar jogo pelo id
  editGame(game: any) {
    const novoTitulo = prompt("Novo título:", game.title);
    if (!novoTitulo) return;

    const updated = { ...game, title: novoTitulo };

    this.gameService.updateGame(game.id, updated).subscribe(() => {
      this.loadGames(3);
    });
  }

  // deletar jogo pelo id
  deleteGame(id: number) {
    this.gameService.deleteGame(id).subscribe(() => {
      this.loadGames(3);
    });
  }
}