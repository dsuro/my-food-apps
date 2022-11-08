import { Injectable } from '@angular/core';
import { environment } from 'projects/food-inventory/src/environments/environment';


@Injectable({providedIn:'root'})
export class HelperService {

    constructor() { }

    getResourceUrl(resourceApi,isLocal=false,isAsset=false){
        if(isLocal){
            return environment.localServerUrl+resourceApi;
        }
        else if(isAsset){
            return environment.assetServerUrl+resourceApi;
        }
        else{
            return environment.baseServerUrl+resourceApi;
        }
    }
}
