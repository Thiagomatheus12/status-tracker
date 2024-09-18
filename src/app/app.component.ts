import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './shared/components/headbar/headbar.component';
import { TUI_THEME } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadbarComponent, TuiRoot],
  providers: [
    { provide: TUI_THEME, useValue: 'dark' }, // Define o tema como escuro
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'status-tracker';
}
