import { Component, OnInit } from '@angular/core';
import { List } from '../../shared/models/list.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CardModule, ListComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  lists: List[] = []; //inicializa la lista de tareas

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.lists = this.dataService.getLists(); // Obtiene las listas de tareas
    console.log('Lists:', this.lists);
  }
}
