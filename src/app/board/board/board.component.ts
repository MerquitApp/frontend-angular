import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Board, Card, ProjectColumn } from '../../shared/models/board.model';
import { BoardService } from '../board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { FirstLetterPipe } from '../../pipes/firtsletter.pipe';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule,
    FormsModule,
    DragDropModule,
    HeaderComponent,
    DialogModule,
    EditorModule,
    ButtonModule,
    InputTextModule,
    DrawerModule,
    AvatarModule,
    FirstLetterPipe,
    BadgeModule
  ],
  providers: [MessageService],
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  board: Board = {
    id: 0,
    name: '',
    project_columns: [],
    project_users: []
  };
  newListTitle: string = ''; //inicializa el titulo de la nueva tarea
  showCreateList = false;
  updatingTask: Card = {
    id: 0,
    title: '',
    description: ''
  };
  isEditingTask: boolean = false;
  isViewingMembers: boolean = false;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  createList(): void {
    if (!this.newListTitle.trim()) return;
    this.boardService.createBoardColumn(this.board!.id, this.newListTitle);
    this.newListTitle = '';
  }

  toggleViewMembers() {
    this.isViewingMembers = !this.isViewingMembers;
  }

  // Método que se llama al soltar una lista
  dropList(event: CdkDragDrop<ProjectColumn[]>) {
    if (event.previousContainer === event.container) {
      // Reordena las listas en el mismo contenedor
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Mueve la lista de un contenedor a otro
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const boardId = +params.get('id')!;
      const board = this.boardService.getBoardById(boardId);

      if (!board) {
        this.router.navigate(['/']);
        return;
      }

      this.board = board!;
    });
    this.boardService.updatingTask$.subscribe((card) => {
      this.isEditingTask = Boolean(card);

      if (card) {
        this.updatingTask = card;
      }
    });
    this.boardService.boards$.subscribe((boards) => {
      this.board = boards.find((board) => board.id === this.board.id)!;
    });
  }

  saveCard() {
    this.boardService.updateBoardTask(
      this.board!.id,
      this.updatingTask.id,
      this.updatingTask
    );
  }

  deleteCard() {
    this.boardService.removeBoardTask(this.board!.id, this.updatingTask.id);
  }

  closeCardDetails() {
    this.boardService.updatingTask$.next(null);
  }

  toggleCreateList() {
    this.showCreateList = !this.showCreateList;
  }
}
