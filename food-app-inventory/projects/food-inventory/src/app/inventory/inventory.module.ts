import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule
  ],
  declarations: [
    InventoryComponent,
    SearchComponent,
    SearchResultComponent
  ],
  exports:[
    FormsModule,
    PrimengModule,
    InventoryComponent,
    SearchComponent,
    SearchResultComponent
  ]
})
export class InventoryModule { }
