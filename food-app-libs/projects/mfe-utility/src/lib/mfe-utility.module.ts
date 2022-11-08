import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MfeWrapperComponent } from './mfe-wrapper.component';
import { MfeUtilityComponent } from './mfe-utility.component';
import { Configurations } from './configurations';



@NgModule({
  declarations: [
    MfeUtilityComponent,
    MfeWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MfeUtilityComponent,
    MfeWrapperComponent
  ]
})
export class MfeUtilityModule { 
  
  public static forRoot(config: Configurations): ModuleWithProviders<MfeUtilityModule> {
    return {
      ngModule: MfeUtilityModule,
      providers: [
        { provide: Configurations, useValue: config }
      ]
    };
  }
}
