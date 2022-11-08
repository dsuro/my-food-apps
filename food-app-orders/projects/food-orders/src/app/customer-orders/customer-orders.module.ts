import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MyBucketComponent } from './components/my-bucket/my-bucket.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MyOrdersComponent,
    MyBucketComponent
  ],
  exports: [
    MyOrdersComponent,
    MyBucketComponent
  ]
})
export class CustomerOrdersModule { }
