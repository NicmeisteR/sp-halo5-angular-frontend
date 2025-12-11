import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'service-records/:gamertag/arena',
    loadComponent: () =>
      import('./features/service-records/arena/arena.component').then(m => m.ArenaComponent)
  }
];