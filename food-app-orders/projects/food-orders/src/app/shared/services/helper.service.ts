import { Injectable } from '@angular/core';
import { environment } from 'projects/food-orders/src/environments/environment';


@Injectable({providedIn:'root'})
export class HelperService {

    constructor() { }

    getResourceUrl(resourceApi,isLocal=false,isAsset=false){
        if(isLocal){
            resourceApi=resourceApi.split('/').join('_').split('-').join('_');
            return environment.localServerUrl+resourceApi;
        }
        else if(isAsset){
            return environment.assetServerUrl+resourceApi;
        }
        else{
            return environment.orderServerUrl+resourceApi;
        }
    }
}
