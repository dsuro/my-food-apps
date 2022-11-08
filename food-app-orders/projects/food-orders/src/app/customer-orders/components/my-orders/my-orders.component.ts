import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomerOrdersService } from '../../../shared/services/customer-orders.service';
import { orderBy } from "lodash";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  @Input() customerToken:string=null;
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();
  customerOrders:any[]=[];
  constructor(private customerOrdersService:CustomerOrdersService) { }

  ngOnInit() {
    this.getCustomerOrders(this.customerToken);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  getCustomerOrders(customerToken:string){
    //console.log(customerToken);
    this.customerOrdersService.getCustomerOrders(customerToken)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((response=>{
      //console.log(response);
     const data=orderBy(response['data'], ['orderDate'], ['desc']);
      //this.customerOrders=response['data'];
      this.customerOrders=data;
    }));
  }
}
