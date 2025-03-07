import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { Board } from '../shared/models/board.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MenuModule,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';
  menuItems: MenuItem[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse para actualizar boards cuando cambien
    this.dataService.boards$.subscribe((boards: Board[]) => {
      this.boards = boards;
    });
  }

  createBoard(): void {
    if (this.newBoardName.trim()) {
      this.dataService.addBoard(this.newBoardName);
      this.newBoardName = '';
    }
  }
  goToBoard(boardId: number): void {
    this.router.navigate(['/board', boardId]);
    console.log(`Navigating to board with id: ${boardId}`);
  }
  deleteBoard(boardId: number): void {
    this.dataService.deleteBoard(boardId);
  }
  focusNewBoardInput() {
    this.newBoardName = '';
  }
}
