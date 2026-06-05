import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './shared/services/auth.service';
import { SyncControlDeckComponent } from './shared/components/sync-control-deck/sync-control-deck.component';
import { CampNavBarComponent } from './shared/components/camp-nav-bar/camp-nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    SyncControlDeckComponent,
    CampNavBarComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
