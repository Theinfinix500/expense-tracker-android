import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard()],
  },
  {
    path: 'login',
    canActivate: [noAuthGuard()],
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
];
