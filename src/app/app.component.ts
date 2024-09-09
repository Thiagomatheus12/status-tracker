import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './shared/components/headbar/headbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'status-tracker';
}
