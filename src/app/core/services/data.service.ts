import { Injectable } from '@angular/core';
import { List, Card } from '../../shared/models/list.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Estado inicial con algunas listas de ejemplo
  private listsSubject = new BehaviorSubject<List[]>([
    { id: 1, title: 'Por hacer', cards: [] },
    { id: 2, title: 'En progreso', cards: [] },
    { id: 3, title: 'Terminadas', cards: [] }
  ]);

  // Observable para que los componentes se suscriban a los cambios
  lists$ = this.listsSubject.asObservable();

  // Método público para actualizar las listas desde otros componentes
  public setLists(lists: List[]): void {
    this.updateLists(lists);
  }

  // Método auxiliar para generar IDs de forma aleatoria
  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

  // Devuelve el valor actual de las listas
  getLists(): List[] {
    return this.listsSubject.getValue();
  }

  // Actualiza el estado de las listas
  private updateLists(lists: List[]): void {
    this.listsSubject.next(lists);
  }

  // Crea una nueva lista
  addList(title: string): void {
    const newList: List = {
      id: this.generateId(),
      title,
      cards: []
    };
    const lists = this.getLists();
    lists.push(newList);
    this.updateLists(lists);
  }

  // Actualiza una lista existente
  updateList(updatedList: List): void {
    const lists = this.getLists().map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    this.updateLists(lists);
  }

  // Elimina una lista
  deleteList(listId: number): void {
    const lists = this.getLists().filter((list) => list.id !== listId);
    this.updateLists(lists);
  }

  // Agrega una tarjeta a una lista
  addCard(listId: number, card: Card): void {
    const lists = this.getLists();
    const list = lists.find((l) => l.id === listId);
    if (list) {
      card.id = this.generateId();
      list.cards.push(card);
      this.updateList(list);
    }
  }

  // Actualiza una tarjeta en una lista
  updateCard(listId: number, updatedCard: Card): void {
    const lists = this.getLists();
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.cards = list.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      this.updateList(list);
    }
  }

  // Elimina una tarjeta de una lista
  deleteCard(listId: number, cardId: number): void {
    const lists = this.getLists();
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.cards = list.cards.filter((card) => card.id !== cardId);
      this.updateList(list);
    }
  }
}
