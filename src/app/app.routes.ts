import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/redirect/redirect.component').then((m) => m.RedirectComponent),
    pathMatch: 'full',
  },
  {
    canActivate: [guestGuard],
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    canActivate: [guestGuard],
    path: 'account-recovery',
    loadComponent: () => import('./components/account-recovery/account-recovery.component').then((m) => m.AccountRecoveryComponent),
  },
  {
    canActivate: [authGuard],
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];