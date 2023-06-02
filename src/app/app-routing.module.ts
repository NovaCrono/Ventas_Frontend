import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Sesion/login/logout/auth.guard';

const routes: Routes = [
  {
    path: 'LogIn',
    loadChildren: () => import('./Sesion/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'LogIn',
    pathMatch: 'full'
  },
  {
    path: 'Main',
    loadChildren: () => import('./Sesion/principal/principal.module').then( m => m.PrincipalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'SignUp',
    loadChildren: () => import('./Sesion/login/signup/signup.module').then( m => m.SignupPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
