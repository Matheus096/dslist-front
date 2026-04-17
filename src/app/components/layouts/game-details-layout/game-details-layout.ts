import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/api/game/game';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, forkJoin } from 'rxjs';
import { UserService } from '../../../services/api/user/user';

@Component({
  selector: 'app-game-details-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details-layout.html',
  styleUrl: './game-details-layout.scss'
})
export class GameDetailsLayoutComponent implements OnInit, OnDestroy {

  gameDetails: any;
  gameScreenshots: any[] = [];
  reviewsList: any[] = [];
  isLoadingReviews: boolean = false;
  private routeSub: Subscription = new Subscription();

  constructor(private gameService: GameService, private userService: UserService, private route: ActivatedRoute) { }

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
      switchMap(id => {

        // O forkJoin executa as duas chamadas à api em paralelo:
        return forkJoin({
          details: this.gameService.getGameById(id),
          screenshots: this.gameService.getScreenshotsById(id)
        });

      })
    ).subscribe({
      next: (res) => {
        this.gameDetails = res.details;
        this.gameScreenshots = res.screenshots.slice(-3);

        if (this.gameDetails && this.gameDetails.rawgId) {
          this.getGameReviews(); 
        }

        console.log('Detalhes:', res.details);
        console.log('Screenshots:', res.screenshots);
      },
      error: (err) => console.error('Erro ao carregar dados do jogo:', err)
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  // Comprar jogo pelo ID
  public buyGame(id: number) {
    this.userService.buyGame(id).subscribe({
      next: () => {
        window.alert("Jogo comprado com sucesso!");
        window.document.querySelector('.btn-buy')!.innerHTML = "✅ Comprado";
      },
      error: (err) => {
        console.error('Erro ao comprar jogo:', err);
        window.alert("Erro ao comprar o jogo.");
      }
    });
  }

  public getGenres(genres: string): string[] {
    return genres.split(',').map(g => g.trim());
  }

  public getGenreClass(genre: string): string {
    const normalized = genre.toLowerCase();

    if (normalized.includes('rpg')) return 'rpg';
    if (normalized.includes('shooter')) return 'shooter';
    if (normalized.includes('adventure')) return 'adventure';
    if (normalized.includes('platform')) return 'platform';
    if (normalized.includes('sports')) return 'sports';

    return 'default';
  }

  public getGameReviews(): void {
    const rawgId = this.gameDetails?.rawgId;

    if (rawgId) {
      this.isLoadingReviews = true;

      this.gameService.getReviewsById(rawgId).subscribe({
        next: (reviews) => {
          this.reviewsList = reviews; 
          this.isLoadingReviews = false;
        },
        error: (err) => {
          console.error('Erro ao carregar reviews:', err)
          this.isLoadingReviews = false;
        }
      });
    }
  }
}
