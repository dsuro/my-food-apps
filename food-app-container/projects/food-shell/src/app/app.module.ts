import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './shared/primeng/primeng.module';
import { SharedModule } from './shared/shared.module';
import { UtilityModule } from 'utility';
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
    AppRoutingModule,
    SharedModule,
    PrimengModule.forRoot(),
    UtilityModule.forRoot(),
    MfeUtilityModule.forRoot({environment:environment})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
