import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadbarComponent } from "./shared/components/headbar/headbar.component";
import { HomePageComponent } from "./features/home/home-page/home-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadbarComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'status-tracker';
}
