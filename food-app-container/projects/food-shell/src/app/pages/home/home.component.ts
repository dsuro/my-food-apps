import { Component,  OnInit} from '@angular/core';
import { RemoteAppDetails } from 'mfe-utility';
import { CustomerOrderService } from '../../shared/services/customer-order.service';
import { cloneDeep } from "lodash";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inventoryAppDetails:RemoteAppDetails={
    remoteAppName:'inventory',
    customElement:'food-inventory-element',
    key:'inventory'
  };
  constructor(private customerOrderService:CustomerOrderService,private messageService: MessageService) { }

  ngOnInit() {
   //this.subsscribeAll();
  }
  subsscribeAll(){
    this.customerOrderService.receiveItemAdded()
    .subscribe((response:any)=>{
      //console.log(response);
      if(!response){

      }
    });
  }
  onAddItem(event){
    //console.log("New Order::",event['detail']['data']);
    let orders=cloneDeep(this.customerOrderService.getOrders());
    //console.log("Existing orders::",orders);
    const newOrder=event['detail']['data'];
    orders=this.checkForOrderExists(newOrder,orders);
    this.customerOrderService.setOrders(orders);
    //console.log("Updated orders::",this.customerOrderService.getOrders());
    this.customerOrderService.sendItemAdded(newOrder);
    this.messageService.add({severity:'success', summary:'Item is added', detail:'Item is added'});
  }
  checkForOrderExists(newOrder:any,orders:Array<any>){
    if(newOrder && orders){
      let found=false;
      orders.forEach(element => {
        if(element['itemId']==newOrder['itemId'])
        {
          const quantity=element['quantity'];
          element['quantity']=quantity + newOrder['quantity'];
          found=true;
        }
      });
      if(!found){
        orders.push(newOrder);
      }
    }
    return orders;
  }
}
