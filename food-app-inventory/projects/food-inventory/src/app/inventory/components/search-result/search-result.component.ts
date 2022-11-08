import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { InventoryService } from '../../../shared/services/inventory.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() searchCriteria:any=null;
  @Output() onAddToCart:EventEmitter<any>=new EventEmitter<any>();
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();
  results:any=[];
  searchType:string=null;
  restaurantData:any;

  constructor(private inventoryService:InventoryService) { }

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['searchCriteria'].currentValue){
      //console.log(this.searchCriteria);
      this.getSearchResult(this.searchCriteria);
    }
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  getSearchResult(searchCriteria:any){
    if(searchCriteria){
      this.searchType=searchCriteria['searchType'];
      this.inventoryService.getSearchResult(searchCriteria['searchType'],searchCriteria['keyword'])
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response=>{
        //console.log(response);
        if(this.searchType=="R"){
          this.restaurantData=response[0];
        }
        else{
          this.results=response;
        }
      }));
    }
  }
  onAddItem(item:any){
    //console.log(item);
    this.onAddToCart.emit(item);
  }
}
