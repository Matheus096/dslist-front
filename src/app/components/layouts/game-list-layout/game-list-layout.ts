import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/api/game/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/api/user/user';
import { AuthService } from '../../../services/api/auth/auth.service';
import { GameStateService } from '../../../services/ui/game-state.service';

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
  listId = 3; // (Todos) é a lista padrão, mas o valor real da lista é pego do GameStateService, que é atualizado quando o usuário seleciona uma nova lista no Navbar. O valor inicial aqui é apenas para garantir que haja um valor antes de receber o valor atualizado do GameStateService

  newGameTitle = ''; // Para criar e editar jogos

  constructor(private gameService: GameService, private router: Router, private userService: UserService, private authService: AuthService, private gameState: GameStateService) {}

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
    
    this.callGameStateChange();
  }

  // ESCUTA mudança da lista
  private callGameStateChange(): void {
    this.gameState.currentList$.subscribe(currentListId => {
      this.listId = currentListId;

      // kkkkkkk criminoso
      if (currentListId == 4) {
        this.listId = 1;
        this.gameState.changeList(this.listId);
      }

      this.loadGames(currentListId);
    });
  }

  public goToHome() {
    this.router.navigate(['/home']);
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

  // método que era usado para pegar o ID da lista selecionada no formulário que estava aqui na GameListLayout, mas agora como esse formulário foi movido para o Navbar, 
  // esse método não é mais necessário aqui, já que a obtenção do ID da lista selecionada está sendo feita no Navbar e compartilhada com a GameListLayout através do GameStateService. 
  // Deixei esse método aqui apenas para referência de como estava sendo feito antes de mover o formulário para o Navbar
  public onListChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const listId = Number(target.value);

    this.loadGames(listId);
  }
}