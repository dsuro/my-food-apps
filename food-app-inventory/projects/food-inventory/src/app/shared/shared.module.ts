import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng/primeng.module';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule
  ],
  declarations: [],
  exports:[]
})
export class SharedModule { }
