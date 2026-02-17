import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/api/game/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/api/user/user';
import { AuthService } from '../../../services/api/auth/auth.service';

@Component({
  selector: 'app-game-list-layout',
  standalone: true,
  templateUrl: './game-list-layout.html',
  styleUrls: ['./game-list-layout.scss'],
  imports: [CommonModule, FormsModule],
})
export class GameListLayoutComponent implements OnInit {
  games: any[] = [];
  userId = 1; // userId já é pego do token JWT no ngOnInit, mas deixei inicializado com 1 aqui apenas para me lembrar de como estava sendo usado/feito antes de eu pegar o userId do token JWT
  listId = 3; // (Exemplo) futuramente pode vir de uma box que o usuário selecione

  newGameTitle = ''; // Para criar e editar jogos

  constructor(private gameService: GameService, private router: Router, private userService: UserService, private authService: AuthService) {}

  /*
  ngOnInit(): void {
    this.loadGames(this.listId); // carrega jogos da lista com ID 3 por padrão (Todos)
  }
  */

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error("Usuário não autenticado");
      this.router.navigate(['/login']);
      return;
    }

    this.userId = userId;
    this.loadGames(this.listId);
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public onListChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const listId = Number(target.value);

    this.loadGames(listId);
  }

  private loadGames(listId: number): void {
    this.userService.getGamesByUserAndList(this.userId, listId).subscribe({
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