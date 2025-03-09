import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CardComponent } from '../card/card.component';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Card, ProjectColumn } from '../../shared/models/board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DragDropModule,
    PanelModule,
    FormsModule,
    CardComponent,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './list.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ListComponent {
  @Input() boardId!: number;
  @Input() list!: ProjectColumn;
  @Input() connectedLists!: { id: number }[];

  // Control de diálogo para editar el título de la lista
  displayEditDialog: boolean = false;
  editedListTitle: string = '';

  constructor(
    private boardService: BoardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // Cuando se hace drag-and-drop de una tarjeta
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Al crear tarjeta, solo usamos el título
  createCard(title: string) {
    if (title.trim()) {
      this.boardService.addBoardTask(this.boardId, this.list.id, title);
    }
  }

  // Se llama cuando el componente Card emite onEdit
  editCard(updatedCard: Card) {
    this.boardService.updateBoardTask(
      this.boardId,
      updatedCard.id,
      updatedCard
    );
  }

  // Se llama cuando el componente Card emite onDelete
  deleteCard(card: Card) {
    this.boardService.removeBoardTask(this.boardId, card.id);
  }

  // Creamos un getter que transforme { id: number } en el string "list-<id>"
  get connectedListIds(): string[] {
    return this.connectedLists.map((list) => 'list-' + list.id);
  }

  // Abre el diálogo para editar el título de la lista
  editListTitle() {
    this.editedListTitle = this.list.name;
    this.displayEditDialog = true;
  }

  // Guarda el nuevo título y cierra el diálogo
  saveListTitle() {
    if (!this.editedListTitle.trim()) return;
    this.boardService.updateProjectColumn(this.boardId, {
      id: this.list.id,
      name: this.editedListTitle
    });
    this.displayEditDialog = false;
    this.editedListTitle = '';
  }

  // Cancela la edición y cierra el diálogo
  cancelEditList() {
    this.displayEditDialog = false;
  }

  // Método que se llamará si se confirma la eliminación
  performDeleteList() {
    this.messageService.add({
      severity: 'info',
      summary: 'Eliminada',
      detail: 'La lista ha sido eliminada'
    });
  }

  // Método para confirmar la eliminación usando ConfirmDialog de PrimeNG
  confirmDeleteList(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Deseas eliminar esta lista?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger'
      },
      accept: () => {
        this.boardService.removeBoardColumn(this.boardId, this.list.id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'La eliminación fue cancelada'
        });
      }
    });
  }
}
