import { Component, OnInit } from '@angular/core';
import { RemoteAppDetails } from 'mfe-utility';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CustomerOrderService } from '../../shared/services/customer-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderAppDetails:RemoteAppDetails={
    remoteAppName:'orders',
    customElement:'food-orders-element',
    key:'myOrders'
  };
  orders:Array<any>=[];
  data:any={"customerToken":null};

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    //console.log(this.authenticationService.userTokenData);
    if(this.authenticationService.userTokenData){
      this.data={"customerToken":this.authenticationService.userTokenData['customerToken']};
    }
  }

}
