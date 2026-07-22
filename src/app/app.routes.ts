import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((m) => m.Register),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
    ],
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then((m) => m.Users),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'ui/primitives',
        loadComponent: () =>
          import('./pages/ui/primitives/primitives').then((m) => m.UiPrimitives),
      },
      {
        path: 'ui/forms',
        loadComponent: () => import('./pages/ui/forms/forms').then((m) => m.UiForms),
      },
      {
        path: 'ui/feedback',
        loadComponent: () => import('./pages/ui/feedback/feedback').then((m) => m.UiFeedback),
      },
      {
        path: 'ui/overlays',
        loadComponent: () => import('./pages/ui/overlays/overlays').then((m) => m.UiOverlays),
      },
      {
        path: 'ui/navigation',
        loadComponent: () =>
          import('./pages/ui/navigation/navigation').then((m) => m.UiNavigation),
      },
      {
        path: 'ui/data-display',
        loadComponent: () =>
          import('./pages/ui/data-display/data-display').then((m) => m.UiDataDisplay),
      },
      {
        path: 'ui/form-blocks',
        loadComponent: () =>
          import('./pages/ui/form-blocks/form-blocks').then((m) => m.UiFormBlocks),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
