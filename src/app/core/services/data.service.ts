import { Injectable } from '@angular/core';
import { List, Card } from '../../shared/models/list.model';
import { Board } from '../../shared/models/board.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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

  // Estado inicial con algunos boards de ejemplo
  private boardsSubject = new BehaviorSubject<Board[]>([]);

  public boards$ = this.boardsSubject.asObservable();

  constructor(private router: Router) {
    const initialBoards: Board[] = [
      { id: 1, name: 'Tablero de Ejemplo', lists: [] }
    ];
    this.boardsSubject.next(initialBoards);
  }

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

  /**
   * Devuelve el array actual de boards
   */
  getBoards(): Board[] {
    return this.boardsSubject.getValue();
  }

  /**
   * Crea un nuevo board con el nombre especificado
   */
  createBoard(boardName: string): void {
    const boards = this.getBoards();
    const newBoard: Board = {
      id: Date.now(), // Genera un ID único
      name: boardName,
      lists: []
    };
    boards.push(newBoard);
    this.boardsSubject.next(boards);
  }

  /**
   * Elimina un board por su ID
   */
  deleteBoard(boardId: number): void {
    const boards = this.getBoards();
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    this.boardsSubject.next(updatedBoards);
  }

  addCard(listId: number, card: Card): void {
    const lists = this.getLists();
    const list = lists.find((l) => l.id === listId);
    if (list) {
      card.id = this.generateId();
      list.cards.push(card);
      this.updateList(list);
    }
  }

  addBoard(boardName: string): void {
    const boards = this.getBoards();
    const newBoard: Board = {
      id: this.generateId(),
      name: boardName,
      lists: []
    };
    boards.push(newBoard);
    this.updateBoards(boards);
  }

  // Actualiza el estado de los boards
  private updateBoards(boards: Board[]): void {
    this.boardsSubject.next(boards);
  }
}
