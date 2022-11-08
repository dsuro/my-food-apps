import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    PrimengModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    MyOrdersComponent,
    MyProfileComponent
  ],
})
export class PagesModule { }
