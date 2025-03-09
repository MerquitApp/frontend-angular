import { Component, Input } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardService } from '../board.service';
import { Card } from '../../shared/models/board.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './card.component.html'
})
export class CardComponent {
  text: string | undefined;
  @Input() card!: Card;

  constructor(private boardService: BoardService) {}

  openCardDetails() {
    this.boardService.updatingTask$.next(this.card!);
  }
}
