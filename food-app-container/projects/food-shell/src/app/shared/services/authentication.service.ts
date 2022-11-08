import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedConstants } from '../constants/shared-constants';
import { HelperService } from './helper.service';

@Injectable({providedIn:'root'})
export class AuthenticationService {
    public currentUser: BehaviorSubject<any>=new BehaviorSubject<any>(null);

    constructor(private http:HttpClient,private helperService:HelperService) { }

    public login(userModel: any):Observable<any>{
        const resourceUrl=this.helperService.getResourceUrl(SharedConstants.LOGIN_URL);
        //console.log(userModel);
        return this.http.post(resourceUrl,userModel)
        .pipe(tap((userTokenData)=>{
          if(userTokenData && userTokenData['data']){
            this.currentUser.next(userTokenData['data']);
            this.userTokenData=userTokenData['data'];
          }else{
            this.currentUser.next(null);
            this.userTokenData=null;
          }
        }));
    }
    public logout(){
      sessionStorage.removeItem('USER_TOKEN');
      this.currentUser.next(null);
    }
    public isUserLoggedIn(): boolean {
      return sessionStorage.getItem('USER_TOKEN')?true:false;
    }
    public getUserLogin(){
        const str=this.userTokenData && this.userTokenData.userId?this.userTokenData.userId:null;
        return str;
    }
    public getCurrentUser(){
      return this.currentUser.asObservable();
    }
    get userTokenData(){
        const userTokenData=sessionStorage.getItem('USER_TOKEN');
        return  userTokenData ? JSON.parse(userTokenData):null;
    }
    set userTokenData(userTokenData:any){
      if(userTokenData){
        sessionStorage.setItem('USER_TOKEN',JSON.stringify(userTokenData));
      }
    }
}