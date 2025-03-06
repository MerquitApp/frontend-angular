//import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CardModule, InputTextModule, RouterModule],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {}
