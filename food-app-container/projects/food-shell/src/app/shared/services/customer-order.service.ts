import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { SharedConstants } from '../constants/shared-constants';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  private orders:Array<any>=[];
  private itemadded$:Subject<any>=new Subject<any>();

  constructor(private http:HttpClient,private helperService:HelperService) { }

  public placeOrder(orderDetails: any):Observable<any>{
    const resourceUrl=this.helperService.getOrderResourceUrl(SharedConstants.CUSTOMER_ORDER_PLACE_URL,true);
    return this.http.post(resourceUrl,orderDetails);
  }
  getCustomerDetails(customerToken:string){
    if(customerToken){
      const resourceUrl=this.helperService.getResourceUrl(SharedConstants.GET_CUSTOMER_PROFILE_URL,true)+`?customerToken=${customerToken}`;
      return this.http.get(resourceUrl);
    }
    else{
        return of(null);
    }
  }
  setOrders(orders:Array<any>){
    this.orders=orders;
  }
  getOrders(){
    return this.orders;
  }
  cleaerOrders(){
    this.orders=[];
  }
  sendItemAdded(itemadded:any){
    this.itemadded$.next(itemadded);
  }
  receiveItemAdded(){
    return this.itemadded$.asObservable();
  }
}
