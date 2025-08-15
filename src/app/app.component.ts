import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isLoading = true;
  private routerEventsSub!: Subscription;
  private startTime = 0;
  private minDuration = 10000; // 10 seconds

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startTime = Date.now();

    this.routerEventsSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.startTime = Date.now();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        const elapsed = Date.now() - this.startTime;
        const remaining = this.minDuration - elapsed;

        if (remaining > 0) {
          setTimeout(() => (this.isLoading = false), remaining);
        } else {
          this.isLoading = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }
}
