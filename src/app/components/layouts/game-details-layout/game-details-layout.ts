import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../../services/api/game/game';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-game-details-layout',
  imports: [],
  templateUrl: './game-details-layout.html',
  styleUrl: './game-details-layout.scss'
})
export class GameDetailsLayoutComponent implements OnInit, OnDestroy {

  gameDetails: any;
  private routeSub: Subscription = new Subscription();

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    this.searchGameByIdUrl();
  }

  private searchGameByIdUrl(): void {
  this.routeSub = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.gameService.getGameById(id))
  ).subscribe({
    next: (data) => {
      this.gameDetails = data;
      console.log('Detalhes do jogo:', data);
    },
    error: (err) => console.error('Erro ao carregar jogo:', err)
  });
}

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  // Comprar jogo pelo ID
  public buyGame(id: number) {
    this.gameService.buyGame(id).subscribe({
      next: (data) => {
        window.alert(data.title + " comprado com sucesso!");
      },
      error: (err) => {
        console.error('Erro ao comprar jogo:', err);
        window.alert("Erro ao comprar o jogo.");
      }
    });
  }
}
