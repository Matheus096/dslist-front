import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-store-layout',
  standalone: true,
  templateUrl: './games-store-layout.html',
  styleUrls: ['./games-store-layout.scss'],
  imports: [CommonModule, FormsModule],
})
export class GamesStoreLayoutComponent implements OnInit {
  games: any[] = [];
  gameDetails: any;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGameStore(); // carrega todos os jogos da loja
  }

  goToHome() {
    this.router.navigate(['/home']); // redireciona para a rota /home
  }

  goToGameDetails(gameId: number) {
    this.router.navigate(['/game_details', gameId]); // redireciona para a rota /game/:id
  }

  loadGameStore(): void {
    this.gameService.getGames().subscribe({
      next: (data) => this.games = data,
      error: (err) => console.error('Erro ao carregar jogos:', err)
    });
  }

  // ---------- BUY ----------
  buyGame(id: number) {
    this.gameService.buyGame(id).subscribe(() => {
      window.alert("Jogo comprado com sucesso!");
    }, (err) => {
      console.error('Erro ao comprar jogo:', err);
      window.alert("Erro ao comprar o jogo.");
    });
  }
}