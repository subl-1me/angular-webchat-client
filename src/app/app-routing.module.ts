import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {
    path: 'home',
    canActivate: [ LoginGuard ],
    loadChildren: () => 
      import('./home/feature/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'settings',
    canActivate: [ LoginGuard ],  
    loadChildren: () => 
    import('./settings/feature/settings-page.module').then(
      (m) => m.SettingsPageModule
    ),
  },
  {
    path: 'login',
    loadChildren: () =>
    import('./login/feature/login-page.module').then(
      (m) => m.LoginPageModule
    )
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/feature/register-page.module').then(
        (m) => m.RegisterPageModule
      )
  },
  {
    path: '**', redirectTo: '/home'
  }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
