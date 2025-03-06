import { Component, Input } from '@angular/core';
import { Card, List } from '../../shared/models/list.model';
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
import { DataService } from '../../core/services/data.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

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
  styleUrl: './list.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListComponent {
  @Input() list!: List;
  @Input() connectedLists!: { id: number }[];

  // Control de diálogo para editar el título de la lista
  displayEditDialog: boolean = false;
  editedListTitle: string = '';

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // Cuando se hace drag-and-drop de una tarjeta
  drop(event: CdkDragDrop<Card[]>) {
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
      const newCard: Card = {
        id: 0,
        title,
        description: '' // Se editará en la ventana emergente
      };
      this.dataService.addCard(this.list.id, newCard);
    }
  }

  // Se llama cuando el componente Card emite onEdit
  editCard(updatedCard: Card) {
    // Actualizamos el card en la lista (DataService)
    this.dataService.updateCard(this.list.id, updatedCard);
  }

  // Se llama cuando el componente Card emite onDelete
  deleteCard(card: Card) {
    this.dataService.deleteCard(this.list.id, card.id);
  }

  // Creamos un getter que transforme { id: number } en el string "list-<id>"
  get connectedListIds(): string[] {
    return this.connectedLists.map((list) => 'list-' + list.id);
  }

  // Abre el diálogo para editar el título de la lista
  editListTitle() {
    this.editedListTitle = this.list.title;
    this.displayEditDialog = true;
  }

  // Guarda el nuevo título y cierra el diálogo
  saveListTitle() {
    if (this.editedListTitle.trim()) {
      this.list.title = this.editedListTitle;
      this.dataService.updateList(this.list);
      this.displayEditDialog = false;
    }
  }

  // Cancela la edición y cierra el diálogo
  cancelEditList() {
    this.displayEditDialog = false;
  }

  deleteList() {
    if (confirm('¿Estás seguro de eliminar esta lista?')) {
      this.dataService.deleteList(this.list.id);
    }
  }

  // Método que se llamará si se confirma la eliminación
  performDeleteList() {
    this.dataService.deleteList(this.list.id);
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
        this.performDeleteList();
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
