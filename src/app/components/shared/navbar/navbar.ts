import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/api/auth/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { GameService } from '../../../services/api/game/game';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, Observable } from 'rxjs';
import { Game } from '../../../core/models/game/game.model';
import { StringUtils } from '../../../utils/string-utils';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  private searchTerms = new Subject<string>();
  public games$!: Observable<Game[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.games$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term.trim()) return of([]);
        return this.gameService.searchGameByTitle(term);
      })
    );
  }

  public onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  public goToGamesStore() {
    this.router.navigate(['/games-store']);
  }

  public goToGames() {
    this.router.navigate(['/games']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public isFocus = false;
  public toggleFocus(status: boolean, searchBox?: HTMLInputElement): void {
    if (status) {
      this.isFocus = true;
    } else {
      setTimeout(() => {
        this.isFocus = false;

        if (searchBox) {
          this.clearSearch(searchBox);
        }
      }, 100);
    }
  }

  public clearSearch(searchBox: HTMLInputElement): void {
    searchBox.value = '';
    this.searchTerms.next('');
  }

  public getSlug(title: string): string {
    return StringUtils.transformarEmSlug(title);
  }
}