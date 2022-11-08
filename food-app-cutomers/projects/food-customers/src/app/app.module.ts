import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRef, DoBootstrap, Injector, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MfeUtilityModule } from 'mfe-utility';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CutsomersModule } from './cutsomers/cutsomers.module';
import { PrimengModule } from './shared/primeng/primeng.module';
import { RequestInterceptor } from './shared/services/request-interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CutsomersModule,
    SharedModule,
    PrimengModule.forRoot(),
    MfeUtilityModule.forRoot({environment:environment})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap{ 

  constructor(private injector:Injector){

  }
  ngDoBootstrap(): void {
    const elem=createCustomElement(AppComponent,{injector:this.injector});
    customElements.define('food-customer-element',elem);
  }
}
