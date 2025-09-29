import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getGameById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}