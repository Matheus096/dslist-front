import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { GameList } from './pages/game-list/game-list';
import { Login } from './pages/login/login';
import { AuthGuard } from './services/auth/auth.guard';
import { Register } from './pages/register/register';
import { GameStore } from './pages/game-store/game-store';
import { GameDetails } from './pages/game-details/game-details';

export const routes: Routes = [
  { path: 'login', component: Login },         // página de login
  { path: 'register', component: Register },   // página de registro
  { path: 'home', component: Home, canActivate: [AuthGuard] }, // home protegida
  { path: 'games', component: GameList, canActivate: [AuthGuard] }, // lista de jogos protegida
  { path: 'games-store', component: GameStore }, // loja de jogos
  { path: 'game_details/:id/:slug', component: GameDetails }, // detalhes do jogo (por id)
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // raiz redireciona para register
  { path: '**', redirectTo: 'register' } // qualquer rota desconhecida redireciona para register
];