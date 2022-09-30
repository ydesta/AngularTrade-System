import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthenticationModule'
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: '**',
    loadChildren: () => import('./common/components/not-found/not-found.module').then( nf => nf.NotFoundModule )
  }
];


export const routing: ModuleWithProviders = RouterModule.forRoot( routes, {
  // preloadingStrategy: PreloadAllModules,
  // useHash: true
} );
