import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/api/game/game';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StringUtils } from '../../../utils/string-utils';

@Component({
  selector: 'app-games-store-layout',
  standalone: true,
  templateUrl: './games-store-layout.html',
  styleUrls: ['./games-store-layout.scss'],
  imports: [FormsModule],
})
export class GamesStoreLayoutComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGameStore(); // carrega todos os jogos da loja
  }

  private loadGameStore(): void {
    this.gameService.getGames().subscribe({
      next: (data) => this.games = data,
      error: (err) => console.error('Erro ao carregar jogos:', err)
    });
  }

  public goToHome() {
    this.router.navigate(['/home']); // redireciona para a rota /home
  }

  public goToGameDetailsByIdUrl(game: any) {
    // 1. Gera o slug usando o título que vem do objeto
    const slug = StringUtils.transformarEmSlug(game.title);

    // 2. Navega passando o ID e o SLUG
    this.router.navigate(['/game_details', game.id, slug]);
  }
}