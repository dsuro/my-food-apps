import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UtilityComponent } from './utility.component';



@NgModule({
  declarations: [
    UtilityComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UtilityComponent
  ]
})
export class UtilityModule { 
  public static forRoot(): ModuleWithProviders<UtilityModule> 
  {
    return {
      ngModule: UtilityModule, 
      providers: [

      ]
    };
  }
}
