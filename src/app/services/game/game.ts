import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GameMin } from '../../core/models/game/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}

  // Recebe lista geral de jogos da loja
  getGames(): Observable<GameMin[]> {
    return this.http.get<GameMin[]>(this.baseUrl);
  }

  // Recebe jogo por ID
  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/${id}`);
  }

  // Comprar jogo pelo id
  buyGame(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/buy`, {});
  }

  searchGameByTitle(title: string): Observable<Game[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Game[]>(this.baseUrl, { params });
  }


  
  // METODOS ABAIXO NAO ESTAO SENDO USADOS NO MOMENTO:
  // Criar novo jogo
  createGame(gameDTO: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, gameDTO);
  }

  // Editar jogo pelo id
  updateGame(id: number, gameDTO: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, gameDTO);
  }

  // deletar jogo pelo id
  deleteGame(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}