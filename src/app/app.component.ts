import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordComponent } from "./password/password.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PasswordComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
