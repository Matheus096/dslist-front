import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-details-layout',
  imports: [],
  templateUrl: './game-details-layout.html',
  styleUrl: './game-details-layout.scss'
})
export class GameDetailsLayoutComponent implements OnInit {

  gameDetails: any;

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    this.route.paramMap.subscribe(params => {
      const gameId = Number(params.get('id'));
      
      if (gameId) {
        this.gameService.getGameById(gameId).subscribe({
          next: (data) => {
            this.gameDetails = data;
            console.log('Detalhes do jogo:', data);
          },
          error: (err) => {
            console.error('Erro ao carregar jogo:', err);
          }
        });
      }
    });
  }
}
