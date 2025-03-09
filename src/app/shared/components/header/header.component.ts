import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BoardService } from '../../../board/board.service';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    RouterLink,
    SplitButtonModule
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value: string;
  boards: Board[] = [];
  items: string[] = [];

  constructor(
    private boardsService: BoardService,
    private router: Router
  ) {
    this.value = '';
  }

  ngOnInit(): void {
    this.boardsService.boards$.subscribe((b) => {
      this.boards = b;
    });
  }

  select() {
    const boardId = this.boards.find((b) => b.name === this.value)?.id;

    if (!boardId) {
      return;
    }

    this.router.navigate(['/board', boardId]);
  }

  search() {
    this.items = this.boards
      .filter((item) => item.name.includes(this.value))
      .map((item) => item.name);
  }
}
