import { NgModule,CUSTOM_ELEMENTS_SCHEMA, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './shared/primeng/primeng.module';
import { CustomerOrdersModule } from './customer-orders/customer-orders.module';
import { MfeUtilityModule } from 'mfe-utility';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomerOrdersModule,
    SharedModule,
    PrimengModule.forRoot(),
    MfeUtilityModule.forRoot({environment:environment})
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap{ 

  constructor(private injector:Injector){

  }
  ngDoBootstrap(): void {
    const elem=createCustomElement(AppComponent,{injector:this.injector});
    customElements.define('food-orders-element',elem);
  }
}
