import { Component, OnInit } from '@angular/core';
import { List } from '../../shared/models/list.model';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';
import { DataService } from '../../core/services/data.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule,
    FormsModule,
    DragDropModule,
    HeaderComponent
  ],
  providers: [MessageService],

  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  lists: List[] = []; //inicializa la lista de tareas
  newListTitle: string = ''; //inicializa el titulo de la nueva tarea
  showCreateList = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Nos suscribimos al observable para obtener las listas actualizadas
    this.dataService.lists$.subscribe((lists) => {
      this.lists = lists;
    });
  }

  // Crea una nueva lista usando el DataService
  createList(): void {
    if (this.newListTitle.trim()) {
      this.dataService.addList(this.newListTitle);
      this.newListTitle = '';
    }
  }
  // Método que se llama al soltar una lista
  dropList(event: CdkDragDrop<List[]>) {
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
    // Actualiza el estado de las listas
    this.dataService.setLists(this.lists); // Actualiza el estado de las listas
  }

  toggleCreateList() {
    this.showCreateList = !this.showCreateList;
  }
}
