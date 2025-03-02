import { Injectable } from '@angular/core';
import { List, Card } from '../../shared/models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  private lists: List[] = [
    {
      id: 1,
      title: 'To Do',
      cards: [
        { id: 1, title: 'Task 1', description: 'Description for Task 1' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2' }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      cards: [{ id: 3, title: 'Task 3', description: 'Description for Task 3' }]
    }
  ];

  getLists(): List[] {
    return this.lists;
  }

  addCardToList(listId: number, card: Card): void {
    const list = this.lists.find((l) => l.id === listId);
    if (list) {
      list.cards.push(card);
    }
  }

  moveCard(sourceListId: number, targetListId: number, card: Card): void {
    this.removeCardFromList(sourceListId, card.id);
    this.addCardToList(targetListId, card);
  }

  private removeCardFromList(listId: number, cardId: number): void {
    const list = this.lists.find((l) => l.id === listId);
    if (list) {
      list.cards = list.cards.filter((c) => c.id !== cardId);
    }
  }
}
