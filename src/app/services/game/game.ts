import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}

  // Recebe lista geral de jogos da loja
  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Recebe jogo por ID
  getGameById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Recebe jogos de uma lista específica de um usuário
  getGamesByUserAndList(userId: number, listId: number): Observable<any[]> {
    const url = `http://localhost:8080/user/${userId}/lists/${listId}/games`;
    return this.http.get<any[]>(url);
  }

  // Comprar jogo pelo id
  buyGame(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/buy`, {});
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