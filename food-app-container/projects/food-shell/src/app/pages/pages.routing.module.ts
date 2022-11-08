import { MfeUtilityModule } from 'mfe-utility';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityModule,MfeUtil } from 'utility';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PagesComponent } from './pages.component';

export const mfe = new MfeUtil();

const routes: Routes = [
  {
    path:'',
    component:PagesComponent,
    children:[
      {
        path: 'home',
        component:HomeComponent
      },
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //       loadRemoteModule({
      //         remoteName:'foodInventory',
      //         exposedModule: './Module',
      //         remoteEntry: 'http://localhost:5001/remoteEntry.js',
      //       })
      //       .then(m => m.AppModule)
      // },
      {
        path: 'orders',
        component:MyOrdersComponent
      },
      {
        path: 'profile',
        component:MyProfileComponent
      },
      {
        path: '',
        redirectTo:'home',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [
    UtilityModule,
    MfeUtilityModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UtilityModule,
    MfeUtilityModule,
    RouterModule
  ]
})
export class PagesRoutingModule { }
