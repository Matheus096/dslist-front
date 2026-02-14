import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  // Recebe jogos de uma lista específica de um usuário
  getGamesByUserAndList(userId: number, listId: number): Observable<User[]> {
    const url = `${this.baseUrl}/${userId}/lists/${listId}/games`;
    return this.http.get<User[]>(url);
  }
}