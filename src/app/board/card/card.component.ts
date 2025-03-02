import { Component, Input } from '@angular/core';
import { Card } from '../../shared/models/list.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
//import { Card } from 'primeng/card';

@Component({
  selector: 'app-card',
  imports: [CardModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card!: Card;
}
