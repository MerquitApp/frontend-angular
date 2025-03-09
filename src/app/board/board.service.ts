import { Injectable } from '@angular/core';
import { Board, Card, ProjectColumn } from '../shared/models/board.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards: Board[] = [];
  private boardsSubject = new BehaviorSubject<Board[]>([]);
  updatingTask$ = new BehaviorSubject<Card | null>(null);
  boards$ = this.boardsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  loadBoards() {
    this.http
      .get<Board[]>(`${environment.apiUrl}/project`, { withCredentials: true })
      .subscribe((boards) => {
        this.boards = boards;
        this.boardsSubject.next(boards);
      });
  }

  createBoard(boardName: string) {
    this.http
      .post<Board>(
        `${environment.apiUrl}/project`,
        { name: boardName },
        {
          withCredentials: true
        }
      )
      .subscribe((board) => {
        this.boards.push(board);
        this.boardsSubject.next(this.boards);
      });
  }

  createBoardColumn(boardId: number, columnTitle: string) {
    const board = this.getBoardById(boardId);

    this.http
      .post<ProjectColumn>(
        `${environment.apiUrl}/project-column/${boardId}`,
        {
          name: columnTitle,
          priority: (board?.project_columns.length ?? -1) + 1
        },
        {
          withCredentials: true
        }
      )
      .subscribe((column) => {
        const board = this.getBoardById(boardId);

        if (!board) {
          return;
        }

        board.project_columns.push(column);
        this.updateBoards(board);
      });
  }

  removeBoardColumn(boardId: number, columnId: number): void {
    const board = this.getBoardById(boardId);

    if (!board) {
      return;
    }

    this.http
      .delete(`${environment.apiUrl}/project-column/${boardId}/${columnId}`, {
        withCredentials: true
      })
      .subscribe(() => {
        board.project_columns = board.project_columns.filter(
          (column) => column.id !== columnId
        );

        this.updateBoards(board);
      });
  }

  updateProjectColumn(boardId: number, column: Partial<ProjectColumn>): void {
    const board = this.getBoardById(boardId);

    if (!board) {
      return;
    }

    this.http
      .patch<ProjectColumn>(
        `${environment.apiUrl}/project-column/${boardId}/${column.id}`,
        column,
        {
          withCredentials: true
        }
      )
      .subscribe((updatedColumn) => {
        const columnIndex = board.project_columns.findIndex(
          (c) => c.id === column.id
        );

        if (columnIndex === -1) {
          return;
        }

        board.project_columns[columnIndex] = updatedColumn;

        this.updateBoards(board);
      });
  }

  addBoardTask(boardId: number, columnId: number, title: string): void {
    const board = this.getBoardById(boardId);

    if (!board) {
      return;
    }

    this.http
      .post<ProjectColumn>(
        `${environment.apiUrl}/project-column/${boardId}/${columnId}/tasks`,
        { title },
        {
          withCredentials: true
        }
      )
      .subscribe((newColumn) => {
        board.project_columns = board.project_columns.map((column) =>
          column.id === columnId ? newColumn : column
        );
        this.updateBoards(board);
      });
  }

  removeBoardTask(boardId: number, cardId: number): void {
    const board = this.getBoardById(boardId);

    if (!board) {
      return;
    }

    this.http
      .delete(`${environment.apiUrl}/task/${boardId}/${cardId}`, {
        withCredentials: true
      })
      .subscribe(() => {
        board.project_columns = board.project_columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task.id !== cardId)
        }));
        this.updateBoards(board);
      });

    this.updatingTask$.next(null);
  }

  updateBoardTask(boardId: number, cardId: number, card: Partial<Card>): void {
    const board = this.getBoardById(boardId);

    if (!board) {
      return;
    }

    this.http
      .patch<Card>(`${environment.apiUrl}/task/${boardId}/${cardId}`, card, {
        withCredentials: true
      })
      .subscribe((updatedCard) => {
        board.project_columns = board.project_columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === cardId ? updatedCard : task
          )
        }));
        this.updateBoards(board);
      });

    this.updatingTask$.next(null);
  }

  shareBoard(boardId: number): void {
    this.http
      .patch<Board>(
        `${environment.apiUrl}/project/share/${boardId}`,
        {},
        {
          withCredentials: true
        }
      )
      .subscribe((sharedBoard) => {
        this.updateBoards(sharedBoard);
      });
  }

  updateBoard(board: Partial<Board>): void {
    this.http
      .patch<Board>(`${environment.apiUrl}/project/${board.id}`, board, {
        withCredentials: true
      })
      .subscribe((updatedBoard) => {
        this.updateBoards(updatedBoard);
      });
  }

  joinBoard(code: string): void {
    this.http
      .post<Board>(
        `${environment.apiUrl}/project/join/${code}`,
        {},
        {
          withCredentials: true
        }
      )
      .subscribe((updatedBoard) => {
        this.boards.push(updatedBoard);
        this.boardsSubject.next(this.boards);
      });
  }

  deleteBoard(boardId: number): void {
    this.http
      .delete(`${environment.apiUrl}/project/${boardId}`, {
        withCredentials: true
      })
      .subscribe(() => {
        const newBoards = this.boards.filter((board) => board.id !== boardId);
        this.boards = newBoards;
        this.boardsSubject.next(newBoards);
      });
  }

  getBoardById(id: number): Board | undefined {
    return this.boardsSubject.getValue().find((board) => board.id === id);
  }

  private updateBoards(newBoard: Board): void {
    this.boards = this.boards.map((board) =>
      board.id === newBoard.id ? newBoard : board
    );
    this.boardsSubject.next(this.boards);
  }
}
