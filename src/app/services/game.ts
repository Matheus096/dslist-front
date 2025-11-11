import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}

  // Lista geral de jogos
  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Jogo por ID
  getGameById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // jogos de uma lista específica de um usuário
  getGamesByUserAndList(userId: number, listId: number): Observable<any[]> {
    const url = `http://localhost:8080/users/${userId}/lists/${listId}/games`;
    return this.http.get<any[]>(url);
  }
}