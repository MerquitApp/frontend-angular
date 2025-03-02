import { Component, Input } from '@angular/core';
import { Card } from '../../shared/models/list.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CardComponent } from '../card/card.component';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    CardComponent,
    DragDropModule,
    PanelModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() list!: {
    id: number;
    title: string;
    cards: Card[];
  };
  @Input() connectedLists!: { id: number }[];

  get connectedListIds(): string[] {
    return this.connectedLists.map((list) => 'list-' + list.id);
  }
  drop(event: CdkDragDrop<Card[]>) {
    console.log('--- DROP EVENT TRIGGERED ---');
    console.log('Event:', event);

    const previousContainerData = event.previousContainer.data || [];
    const currentContainerData = event.container.data || [];

    console.log('Previous Container ID:', event.previousContainer.id);
    console.log('Current Container ID:', event.container.id);
    console.log('Previous Index:', event.previousIndex);
    console.log('Current Index:', event.currentIndex);
    console.log('Previous Container Data (before move):', [
      ...previousContainerData
    ]);
    console.log('Current Container Data (before move):', [
      ...currentContainerData
    ]);

    if (
      !Array.isArray(previousContainerData) ||
      !Array.isArray(currentContainerData)
    ) {
      console.error(
        'Error: previousContainerData or currentContainerData is not an array'
      );
      return;
    }

    if (event.previousContainer === event.container) {
      console.log('Items are being reordered within the same container.');
      moveItemInArray(
        currentContainerData,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('Items are being transferred between different containers.');
      transferArrayItem(
        previousContainerData,
        currentContainerData,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log('--- DROP EVENT COMPLETED ---');
  }
}
