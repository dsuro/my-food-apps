import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SharedConstants } from '../constants/shared-constants';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrdersService {

  constructor(private http:HttpClient,private helperService:HelperService) { }

  getCustomerOrders(customerToken:string):Observable<any>{
    if(customerToken){
      const resourceUrl=this.helperService.getResourceUrl(SharedConstants.CUSTOMER_ORDERS_URL,true)+`?customerToken=${customerToken}`;
      return this.http.get(resourceUrl);
    }
    else{
      return of(null);
    }
  }
  getGroupByData(list:any[],groupBy:string){
    let newArr=[];
    if(list){
      list.forEach((item)=>{
        if(item[groupBy]){
          let finded=newArr.filter((newItem)=>{return newItem['groupKey']==item[groupBy]});
          if(finded.length>0){
            finded[0].items.push(item);
          }
          else{
            newArr.push({groupKey:item[groupBy],items:[item]});
          }
        }
      });
    }
    return newArr;
  }
}
