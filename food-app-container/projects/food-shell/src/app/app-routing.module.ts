import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'my-food',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '',
    redirectTo:'my-food',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '**',
    component:NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
