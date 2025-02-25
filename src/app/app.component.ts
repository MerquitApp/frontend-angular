import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [ButtonModule],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
}
