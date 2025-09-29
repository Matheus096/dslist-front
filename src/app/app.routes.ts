import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { GameList } from './pages/game-list/game-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // redireciona '' para /home acessando a rota raiz do projeto
  { path: 'home', component: Home },   // página inicial
  { path: 'games', component: GameList } // lista de jogos
];
