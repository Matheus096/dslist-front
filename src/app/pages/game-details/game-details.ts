import { Component } from '@angular/core';
import { GameDetailsLayoutComponent } from '../../components/layouts/game-details-layout/game-details-layout';
import { Navbar } from '../../components/shared/navbar/navbar';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [GameDetailsLayoutComponent, Navbar],
  templateUrl: './game-details.html',
  styleUrl: './game-details.scss'
})
export class GameDetails {

}
