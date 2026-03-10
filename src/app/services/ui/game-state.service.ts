import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private listSource = new BehaviorSubject<number>(3); // valor inicial é 3 (Todos), mas esse valor é atualizado quando o usuário seleciona uma nova lista no Navbar
  public currentList$ = this.listSource.asObservable();

  changeList(listId: number) {
    this.listSource.next(listId);
  }

}