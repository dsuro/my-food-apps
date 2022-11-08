import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, share } from "rxjs";
import { map } from "rxjs/operators";
import { SharedConstants } from '../constants/shared-constants';
import { HelperService } from './helper.service';
import { uniq  } from "lodash";

@Injectable({providedIn:'root'})
export class InventoryService {

constructor(private http:HttpClient,private helperService:HelperService) { }
    public inventory:Object;
    public inventoryObservable:Observable<any>=null;

    getSearchKeywords(searchType:string,keyword:string):Observable<any>{
        let result:string[]=[];
        if(searchType && keyword){
            if(searchType=="R"){
                const restaurantList=this.getUniqRestaurantList(this.inventory);
                result=restaurantList.filter(item=>{
                    return (item as string).toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
                });
            }
            else if(searchType=="F"){
                const foodList=this.getUniqFoodList(this.inventory);
                result=foodList.filter(item=>{
                    return (item as string).toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
                });
            }
        }
        return of(result);
    }
    getSearchResult(searchType:string,keyword:string):Observable<any>{
        let result:string[]=[];
        if(searchType && keyword){
            if(searchType=="R"){
                const restaurantList=this.getRestaurantList(this.inventory);
                result=restaurantList.filter(item=>{
                    return item['restaurantName']==keyword;
                });
            }
            else if(searchType=="F"){
                const foodList=this.getFoodList(this.inventory);
                result=foodList.filter(item=>{
                    return item['itemName']==keyword;
                });
            }
        }
        return of(result);
    }
    getFoodInventory():Observable<any>{
        if(this.inventory){ 
           this.inventoryObservable=of(this.inventory);
        }
        else{
            const resourceUrl=this.helperService.getResourceUrl(SharedConstants.FOOD_INVENTORY_URL);
            this.inventoryObservable=this.http.get(resourceUrl).pipe(map((res:any)=>{
                this.inventory=res['data'];
                return this.inventory;
            },share()));
          
        }
        return this.inventoryObservable;
    }
    getUniqRestaurantList(data:any){
        let list=[];
        if(data && data.length>0){
            data.forEach(element => {
                list.push(element['restaurantName']);
            });
            list=uniq(list);
        }
        return list;
    }
    getUniqFoodList(data:any){
        let list=[];
        if(data && data.length>0){
            data.forEach(element => {
                let foodItems=element['foodItems'];
                foodItems.forEach(food => {
                    list.push(food['itemName']);
                });
            });
           list=uniq(list);
        }
        return list;
    }
    getFoodList(data:any){
        let list=[];
        if(data && data.length>0){
            data.forEach(element => {
                let foodItems=element['foodItems'];
                foodItems.forEach(food => {
                    food['quantity']=1;//default
                    list.push(food);
                });
            });
        }
        return list;
    }
    getRestaurantList(data:any){
        let list=[];
        if(data && data.length>0){
            data.forEach(element => {
                list.push(element);
            });
        }
        return list;
    }
}
