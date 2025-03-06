import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../shared/models/list.model';
//import { CommonModule } from '@angular/common';
//import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    EditorModule,
    ButtonModule,
    InputTextModule,
    DragDropModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  text: string | undefined;
  @Input() card!: Card;
  @Output() onEdit = new EventEmitter<Card>();
  @Output() onDelete = new EventEmitter<Card>();

  // Controla la visibilidad del diálogo
  displayDetails: boolean = false;

  // Abre el diálogo
  openCardDetails() {
    this.displayDetails = true;
  }

  // Cierra el diálogo
  closeCardDetails() {
    this.displayDetails = false;
  }

  // Guarda cambios (por ejemplo, actualiza el servicio o emite un evento)
  saveCard() {
    // Emitimos evento de edición para que el padre (ListComponent) o DataService maneje la lógica
    this.onEdit.emit(this.card);

    // Cierra el diálogo
    this.displayDetails = false;
    this.closeCardDetails();
  }

  // Eliminar tarjeta (opcionalmente puedes llamar a onDelete directamente desde un botón)
  deleteCard() {
    this.onDelete.emit(this.card);
    this.displayDetails = false;
    this.closeCardDetails();
  }
}
