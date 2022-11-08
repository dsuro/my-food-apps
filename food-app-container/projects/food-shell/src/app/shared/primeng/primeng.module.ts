/*Module Sections */
import {NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {FieldsetModule} from 'primeng/fieldset';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
/*Service Sections */
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';


const sharedModules=[
  AccordionModule,
  DropdownModule,
  MultiSelectModule,
  TableModule,
  PanelModule,
  TooltipModule,
  OverlayPanelModule,
  DialogModule,
  ConfirmDialogModule,
  FieldsetModule,
  MessagesModule,
  MessageModule,
  FileUploadModule,
  InputNumberModule,
  CheckboxModule,
  ToastModule
];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules
  ],
  exports:[
    ...sharedModules
  ],
})
export class PrimengModule { 
  public static forRoot(): ModuleWithProviders<PrimengModule> 
  {
    return {
      ngModule: PrimengModule, 
      providers: [
        ConfirmationService,
        MessageService
      ]
    };
  }
}
