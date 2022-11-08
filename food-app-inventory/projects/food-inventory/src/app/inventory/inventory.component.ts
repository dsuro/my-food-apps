import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RemoteMfeEvent,RemoteEventTypes } from 'mfe-utility';
import { Subject, takeUntil } from 'rxjs';
import { InventoryService } from '../shared/services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @Output() remoteEvent:EventEmitter<RemoteMfeEvent>=new EventEmitter<RemoteMfeEvent>();
  public searchCriteria:any=null;
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();

  constructor(private inventoryService:InventoryService) { }

  ngOnInit() {
    this.getFoodInventory();
  }
  ngOnDestroy(): void {
    this.clearInventoryCache();
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  getFoodInventory(){
    this.inventoryService.getFoodInventory()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((response=>{
      //console.log(response);
    }));
  }
  clearInventoryCache(){
    this.inventoryService.inventory=null;
    this.inventoryService.inventoryObservable=null;
  }
  onItemSelect(event){
    //console.log(event);
    this.searchCriteria=event;
  }
  onItemAddToCart(event){
    //console.log(event);
    const orderItem=Object.assign({},event);
    this.remoteEvent.emit({type:RemoteEventTypes.DATA_SEND,data:orderItem,source:'inventory',destination:'orders'});
  }
}
