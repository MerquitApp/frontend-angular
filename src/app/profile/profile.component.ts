import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import 'primeicons/primeicons.css';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { FirstLetterPipe } from '../pipes/firtsletter.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    NgIf,
    FormsModule,
    AvatarModule,
    FirstLetterPipe,
    ButtonModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  profilePictureUrl: string = '';
  userName: string = '';
  isEditingName: boolean = false;

  constructor(private readonly authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      if (!user) return;

      this.userName = user.username;
    });
  }

  updateProfile(): void {
    this.authService.updateUser({
      username: this.userName
    });
  }

  logout(): void {
    this.authService.logout();
  }

  deleteAccount(): void {
    this.authService.deleteAccount();
  }

  toggleEditName(): void {
    if (this.isEditingName) {
      this.updateProfile();
    }

    this.isEditingName = !this.isEditingName;
  }
}
