import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'camp-registry',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/camp-registry/camp-registry.module').then(m => m.CampRegistryModule)
  },
  {
    path: 'register',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'screening',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/screening/screening.module').then(m => m.ScreeningModule)
  },
  {
    path: 'inventory',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule)
  },
  { path: 'beneficiaries', redirectTo: 'camp-registry', pathMatch: 'full' },
  { path: 'visits', redirectTo: 'screening', pathMatch: 'full' },
  { path: 'stock', redirectTo: 'inventory', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
