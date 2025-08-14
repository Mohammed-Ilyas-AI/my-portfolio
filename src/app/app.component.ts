import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SkillsComponent } from './features/skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,SkillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-portfolio';
}
