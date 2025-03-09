import { Component, OnInit } from '@angular/core';
import { Board } from '../shared/models/board.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from '../shared/components/header/header.component';
import { BoardService } from '../board/board.service';
import { DasboardBoardCardComponent } from '../dasboard-board-card/dasboard-board-card.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DasboardBoardCardComponent,
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    HeaderComponent,
    DialogModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';
  displayJoinDialog: boolean = false;
  joinCode: string = '';

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.loadBoards();

    this.boardService.boards$.subscribe((boards: Board[]) => {
      this.boards = boards;
    });
  }

  joinBoard(): void {
    this.boardService.joinBoard(this.joinCode);
    this.displayJoinDialog = false;
  }

  cancelJoin(): void {
    this.displayJoinDialog = false;
  }

  openJoinDialog(): void {
    this.displayJoinDialog = true;
  }

  createBoard(): void {
    if (!this.newBoardName.trim()) {
      return;
    }

    this.boardService.createBoard(this.newBoardName);
    this.newBoardName = '';
  }

  focusNewBoardInput() {
    this.newBoardName = '';
  }
}
