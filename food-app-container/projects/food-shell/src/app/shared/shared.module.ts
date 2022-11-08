import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BucketComponent } from './components/bucket/bucket.component';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng/primeng.module';
import { LoginComponent } from './components/login/login.component';
import { MfeWrapperComponent } from './components/mfe-wrapper/mfe-wrapper.component';
import { MfeUtilityModule } from 'mfe-utility';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




const sharedComponents=[
  HeaderComponent,
  FooterComponent,
  BucketComponent,
  LoginComponent,
  MfeWrapperComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MfeUtilityModule
  ],
  declarations: [...sharedComponents],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    ...sharedComponents]
})
export class SharedModule { }
