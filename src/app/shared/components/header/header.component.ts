import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';

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
export class HeaderComponent {
  value: string;
  items: string[];

  constructor() {
    this.value = '';
    this.items = [];
  }

  search() {
    this.items = [
      'Proyecto 1',
      'Proyecto 2',
      'Proyecto 3',
      'Proyecto 4',
      'Proyecto 5'
    ];
  }
}
