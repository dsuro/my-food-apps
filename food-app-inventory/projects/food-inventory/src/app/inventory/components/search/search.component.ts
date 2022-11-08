import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventoryService } from '../../../shared/services/inventory.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() onSearchItemSelect:EventEmitter<any>=new EventEmitter<any>();
  searchType:string="R";
  results:any=[];
  keyword:string="";
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();

  constructor(private inventoryService:InventoryService) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  search(event){
    //console.log(event.query);
    this.inventoryService.getSearchKeywords(this.searchType,event.query)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((response=>{
      this.results=response;
    }));
  }
  onSearchClear(){
    //console.log("onSearchClear");
    this.onSearchItemSelect.emit({"searchType":this.searchType,"keyword":""});
  }
  onSearchTypeChange(event){
   //console.log(event);
   if(event){
      this.keyword="";
      this.onSearchItemSelect.emit({"searchType":this.searchType,"keyword":this.keyword});
    }
  }
  onItemSelect(event){
    //console.log(event);
    if(event){
      this.onSearchItemSelect.emit({"searchType":this.searchType,"keyword":event});
    }
  }
}
