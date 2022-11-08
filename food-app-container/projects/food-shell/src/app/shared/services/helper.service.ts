import { Injectable } from '@angular/core';
import { environment } from 'projects/food-shell/src/environments/environment';

@Injectable({providedIn:'root'})
export class HelperService {

    constructor() { }

    getResourceUrl(resourceApi:string,isLocal=false,isAsset=false){
        if(isLocal){
            resourceApi=resourceApi.split('/').join('_').split('-').join('_');
            return environment.localServerUrl+resourceApi;
        }
        else if(isAsset){
            return environment.assetServerUrl+resourceApi;
        }
        else{
            return environment.customerServerUrl+resourceApi;
        }
    }

    getOrderResourceUrl(resourceApi,isLocal=false,isAsset=false){
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
