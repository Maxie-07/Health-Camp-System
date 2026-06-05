import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface CampNavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-camp-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './camp-nav-bar.component.html'
})
export class CampNavBarComponent {
  readonly items: CampNavItem[] = [
    { label: 'ADMIN DASHBOARD', route: '/dashboard', icon: 'pi pi-chart-line' },
    { label: 'CAMP REGISTRY', route: '/camp-registry', icon: 'pi pi-list' },
    { label: 'REGISTER BENEFICIARY', route: '/register', icon: 'pi pi-user-plus' },
    { label: 'PERFORM SCREENING', route: '/screening', icon: 'pi pi-heart' },
    { label: 'CONSUMABLES INVENTORY', route: '/inventory', icon: 'pi pi-box' }
  ];
}
