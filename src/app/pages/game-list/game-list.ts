import { Component } from '@angular/core';
import { GameListLayoutComponent } from '../../components/game-list-layout/game-list-layout';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameListLayoutComponent, Navbar],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss'
})
export class GameList {

}
