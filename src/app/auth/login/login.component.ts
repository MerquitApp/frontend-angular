import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  imports: [FormsModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  githubLoginUrl = `${environment.apiUrl}/auth/login/github`;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password);
  }
}
