import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import 'primeicons/primeicons.css';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profilePictureUrl: string = '';
  userName: string = '';
  userEmail: string = '';
  isEditingName: boolean = false;
  isEditingEmail: boolean = false;

  ngOnInit(): void {
    // Aquí puedes asignar valores reales a las propiedades
    this.profilePictureUrl = 'https://thispersondoesnotexist.com/';
    this.userName = 'Pepe Pérez';
    this.userEmail = 'pepepe@example.com';
  }

  toggleEditName(): void {
    this.isEditingName = !this.isEditingName;
  }

  toggleEditEmail(): void {
    this.isEditingEmail = !this.isEditingEmail;
  }
}
