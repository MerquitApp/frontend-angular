import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userImage: string = 'https://github.com/github.png';
  showProjects: boolean = false;

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }
}
