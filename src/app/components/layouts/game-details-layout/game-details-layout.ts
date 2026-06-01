import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/api/game/game';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, forkJoin } from 'rxjs';
import { UserService } from '../../../services/api/user/user';

// Importações necessárias para o formulário
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReviewService } from '../../../services/api/reviews/review';
import { ReviewDTO } from '../../../core/models/reviewDTO/review.model';

@Component({
  selector: 'app-game-details-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './game-details-layout.html',
  styleUrl: './game-details-layout.scss'
})
export class GameDetailsLayoutComponent implements OnInit, OnDestroy {

  gameDetails: any;
  gameScreenshots: any[] = [];
  reviewsList: any[] = [];
  isLoadingReviews: boolean = false;

  // Propriedades para o controle do formulário local
  reviewForm!: FormGroup;
  currentRating: number = 0;
  starsArray = [1, 2, 3, 4, 5];
  private routeSub: Subscription = new Subscription();

  constructor(private gameService: GameService, private userService: UserService, private reviewService: ReviewService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    this.initForm();
    this.searchGameByIdUrl();
  }

  // Inicializa o formulário com validações básicas
  private initForm(): void {
    this.reviewForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
      rating: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // Define a nota quando clicar nas estrelas
  public selectRating(starClicked: number): void {

    const realRating = 6 - starClicked; 
    this.currentRating = realRating;
    
    this.reviewForm.patchValue({ rating: realRating });
  }

  // Enviar a nova avaliação para o back
  public submitReview(): void {
    if (this.reviewForm.valid && this.gameDetails) {
      const newReview: ReviewDTO = {
        gameId: this.gameDetails.id,
        text: this.reviewForm.value.text,
        rating: this.reviewForm.value.rating
      };

      this.reviewService.insert(newReview).subscribe({
        next: (response) => {
          window.alert('Avaliação enviada com sucesso!');
          
          // Limpa o formulário na tela
          this.reviewForm.reset({ text: '', rating: 0 });
          this.currentRating = 0;
          
          // Recarrega as reviews da tela para mostrar o novo comentário
          this.getGameReviews();
        },
        error: (err) => {
          console.error('Erro ao salvar review:', err);
          window.alert('Erro ao enviar avaliação. Verifique se está logado.');
        }
      });
    }
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

  // O getGameReviews() agora além de buscar as reviews que vinham da RAWG, também busca as reviews locais do meu banco em paralelo
  public getGameReviews(): void {
    const rawgId = this.gameDetails?.rawgId;
    const localId = this.gameDetails?.id;

    if (rawgId && localId) {
      this.isLoadingReviews = true;

      forkJoin({
        rawgReviews: this.gameService.getReviewsById(rawgId),
        localReviews: this.reviewService.findByGame(localId)
      }).subscribe({
        next: (res) => {
          // Mapeia e padroniza os dados da RAWG
          const mappedRawg = res.rawgReviews.map((c: any) => ({
            id: c.id,
            author: c.user?.username || 'Anônimo',
            text: c.text,
            rating: c.rating,
            createdAt: c.created,
            origin: 'rawg'
          }));

          // Mapeia e padroniza os dados do meu banco
          const mappedLocal = res.localReviews.map((c: any) => ({
            id: c.id,
            author: c.userName || 'Membro da Comunidade',
            text: c.text,
            rating: c.rating,
            createdAt: c.createdAt,
            origin: 'local'
          }));

          // Junta tudo e ordena pela data mais recente
          this.reviewsList = [...mappedLocal, ...mappedRawg].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          this.isLoadingReviews = false;
        },
        error: (err) => {
          console.error('Erro ao carregar reviews:', err);
          this.isLoadingReviews = false;
        }
      });
    }
  }
}
