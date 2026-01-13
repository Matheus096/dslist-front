import { Component } from '@angular/core';
import { GamesStoreLayoutComponent } from '../../components/layouts/games-store-layout/games-store-layout';
import { Navbar } from '../../components/shared/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-store',
  standalone: true,
  imports: [GamesStoreLayoutComponent, Navbar, RouterModule],
  templateUrl: './game-store.html',
  styleUrl: './game-store.scss'
})
export class GameStore {

}
