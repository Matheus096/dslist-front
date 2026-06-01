import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewDTO } from '../../../core/models/reviewDTO/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private baseUrl = 'https://dslist-61be.onrender.com/reviews';

  constructor(private http: HttpClient) { }

  // GET: Busca as reviews locais do meu banco para o jogo atual
  findByGame(gameId: number): Observable<ReviewDTO[]> {
    return this.http.get<ReviewDTO[]>(`${this.baseUrl}/game/${gameId}`);
  }

  // POST: Envia a nova review para o banco
  insert(review: ReviewDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(this.baseUrl, review);
  }
}