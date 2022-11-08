import { Component, OnInit,Output,EventEmitter,Input,SimpleChanges } from '@angular/core';
import { RemoteAppDetails } from 'mfe-utility';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  @Input() orders:Array<any>=[];
  @Output() onBucketUpdate:EventEmitter<any>=new EventEmitter<any>();
  orderAppDetails:RemoteAppDetails={
    remoteAppName:'orders',
    customElement:'food-orders-element',
    key:'myBucket'
  };
  bucketData:any={
    "orders":[]
  };

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes && changes['orders'].currentValue){
        this.bucketData={"orders":this.orders};
      }
  }
  onBucketEvent(event){
    //console.log(event['detail']);
    const data=event['detail']['data'];
    this.onBucketUpdate.emit({"action":data['action'],"data":data['record']});
  }
  clearBucket(){
    this.orders=[];
    this.bucketData={
      "orders":[]
    };
  }
}
