import { Component, EventEmitter, Input, Output,OnInit} from '@angular/core';
import { RemoteEventTypes,RemoteMfeEvent } from "mfe-utility";
import { CustomerOrdersService } from '../../../shared/services/customer-orders.service';

@Component({
  selector: 'app-my-bucket',
  templateUrl: './my-bucket.component.html',
  styleUrls: ['./my-bucket.component.css']
})
export class MyBucketComponent implements OnInit {
  @Input() orders:any;
  @Output() remoteEvent:EventEmitter<RemoteMfeEvent>=new EventEmitter<RemoteMfeEvent>();
  restaurants:any[]=[];
  totalPrice:number=0.00;
  gst:number=8.5;
  tax:number=0.00;
  totalAmount:number=0.00;

  constructor(private customerOrdersService:CustomerOrdersService) { }

  ngOnInit() {
    //console.log(this.orders);
    this.restaurants=this.customerOrdersService.getGroupByData(this.orders,'restaurantName');
    this.totalPrice=this.calculateTotalPrice(this.orders);
    this.tax=this.calculateTax(this.totalPrice);
    this.totalAmount=this.totalPrice + this.tax;
    //console.log(this.restaurants);
  }
  onClearBucket(){
    this.restaurants=[];
    this.remoteEvent.emit({type:RemoteEventTypes.DATA_SEND,
      data:{
      action:'CLEAR_BUCKET',
      record:null
    },
    source:'orders',destination:'foodShell'});
  }
  onOrderPlace(){
    this.remoteEvent.emit({type:RemoteEventTypes.DATA_SEND,
      data:{
      action:'PLACE_ORDER',
      record:{
        orders:this.orders,
        totalPrice:this.totalPrice,
        tax:this.tax,
        totalAmount:this.totalAmount
      }
    },
    source:'orders',destination:'foodShell'});
  }
  calculateTotalPrice(orders:any[]){
    let totalPrice=0.00;
    if(orders && orders.length>0){
      orders.forEach(order => {
        let pricePerQuantity=order['pricePerQuantity'];
        let quantity=order['quantity'];
        totalPrice= totalPrice+ Number(pricePerQuantity) * Number(quantity);
      });
    }
    return totalPrice;
  }
  calculateTax(totalPrice:number){
    let tax= (this.gst * totalPrice)/100;
    return Number(tax.toFixed(2));
  }
}
