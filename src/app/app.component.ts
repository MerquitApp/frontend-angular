import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CardModule, InputTextModule, RouterModule],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadUser();
  }
}
