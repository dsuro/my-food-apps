import { ApplicationRef, DoBootstrap, Injector, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InventoryModule } from './inventory/inventory.module';
import { PrimengModule } from './shared/primeng/primeng.module';
import { SharedModule } from './shared/shared.module';
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
    InventoryModule,
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
    customElements.define('food-inventory-element',elem);
  }
}
