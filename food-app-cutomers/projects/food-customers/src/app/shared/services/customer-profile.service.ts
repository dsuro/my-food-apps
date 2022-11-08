import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { SharedConstants } from '../constants/shared-constants';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class CustomerProfileService {

    constructor(private http:HttpClient,private helperService:HelperService) { }

    getCustomerProfile(customerToken:string){
        if(customerToken){
            const resourceUrl=this.helperService.getResourceUrl(SharedConstants.GET_CUSTOMER_PROFILE_URL,true)+`?customerToken=${customerToken}`;
            return this.http.get(resourceUrl);
        }
        else{
            return of(null);
        }
    }
    updateCustomerProfile(customerProfile:any){
        const resourceUrl=this.helperService.getResourceUrl(SharedConstants.UPDATE_CUSTOMER_PROFILE_URL,true);
        return this.http.post(resourceUrl,customerProfile);
    }
}
