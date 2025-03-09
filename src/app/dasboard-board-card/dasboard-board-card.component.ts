import { Component, Input } from '@angular/core';
import { Board } from '../shared/models/board.model';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { BoardService } from '../board/board.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dasboard-board-card',
  imports: [
    RouterLink,
    MenuModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './dasboard-board-card.component.html'
})
export class DasboardBoardCardComponent {
  @Input() board!: Board;
  isEditing: boolean = false;
  menuItems: MenuItem[] = [];

  constructor(private boardService: BoardService) {}

  onMenuShow() {
    this.menuItems = [
      {
        label: this.board?.shareCode ? 'Copiar código' : 'Ccompartir',
        icon: 'pi pi-share-alt',
        command: () => {
          if (this.board.shareCode) {
            navigator.clipboard.writeText(this.board.shareCode);
            return;
          }

          this.boardService.shareBoard(this.board.id);
        }
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          this.isEditing = true;
        }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          this.boardService.deleteBoard(this.board.id);
        }
      }
    ];
  }

  confirmEdit() {
    this.isEditing = false;
    this.boardService.updateBoard(this.board);
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
