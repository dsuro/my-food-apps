import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomerOrderService } from '../../services/customer-order.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  orders:Array<any>=[];
  cartItemCount:number=0;
  orderDetails:any=null;
  gst:number=8.5;
  restaurants:any[]=[];
  showOrderConfirmation:boolean=false;
  customerToken:string=null;
  deliveryAddress:string=null;;
  contactNo:string=null;
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();

  get isUserLoggedIn(){
    return this.authenticationService.isUserLoggedIn();
  }
  constructor(private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authenticationService:AuthenticationService,
    private customerOrderService:CustomerOrderService) { }

  ngOnInit() {
   this.customerToken=this.authenticationService.userTokenData?.customerToken;
   this.getCustomerDetails();
   this.subsscribeAll();
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  subsscribeAll(){
    //#region [After Item added]
    this.customerOrderService.receiveItemAdded()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((response:any)=>{
      //console.log(response);
      if(response){
        this.updateBucket();
      }
    });
    //#endregion
    //#region [After user login]
    this.authenticationService.getCurrentUser()
    .subscribe((response:any)=>{
      //console.log(response);
      if(response){
        this.updateBucket();
      }
    });
    //#endregion
  }
  getCustomerDetails(){
    this.customerOrderService.getCustomerDetails(this.customerToken)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(response=>{
      //console.log(response);
      if(response && response['data'] && response['data']['details']){
        this.deliveryAddress=response['data']['details']['address'];
        this.contactNo=response['data']['details']['phone'];
      }
    });
  }
  updateBucket(){
    this.orders=this.customerOrderService.getOrders();
    this.cartItemCount=this.customerOrderService.getOrders().length;
  }
  onBucketUpdate(event){
    if(event['action']=="CLEAR_BUCKET"){
      this.confirmationService.confirm({
        key:'BUCKET_CLEAR',
        message: 'Are you sure that you want to clear this bucket?',
        accept: () => {
          this.clearBucket();
          this.messageService.add({severity:'success', summary:'Bucket is cleared', detail:'Bucket is cleared'});
        }
      });
    }
    else if(event['action']=="PLACE_ORDER"){
      //console.log(event['data']);
      if(this.isUserLoggedIn){
        this.placeOrders(event['data']);
      }
      else{
        this.router.navigate(['/login']);
      }
    }
  }
  placeOrders(orderDetails){
    //console.log(orderDetails);
    this.orderDetails=orderDetails;
    this.restaurants=this.getGroupByData(this.orderDetails.orders,'restaurantName');
    this.showOrderConfirmation=true;
  }
  cancelOrder(){
    this.showOrderConfirmation=false;
  }
  onProceed(orderDetails){
    if(orderDetails && this.customerToken){
      orderDetails['orderId']=0;
      orderDetails['customerId']=this.customerToken;
      orderDetails['orderDate']="";
      orderDetails['orderItems']=orderDetails['orders'];
      delete orderDetails['orders'];
      delete orderDetails['totalPrice'];
      //console.log(orderDetails);
      this.customerOrderService.placeOrder(orderDetails)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(response=>{
        if(response['success']){
          this.showOrderConfirmation=false;
          this.messageService.add({severity:'success', summary:response['status'], detail:response['status']});
          this.clearBucket();
          this.router.navigate(['/my-food/orders']);
        }
        else{
          this.showOrderConfirmation=false;
          this.messageService.add({severity:'error', summary:response['status'], detail:response['status']});
        }
      });
    }
  }
  clearBucket(){
    this.orders=[];
    this.customerOrderService.setOrders([]);
    this.cartItemCount=0;
    this.customerOrderService.sendItemAdded(null);
  }
  onLogin(){
    this.router.navigate(['/login']);
  }
  onLoggout(){
    this.confirmationService.confirm({
      key:'USER_SIGN_OUT',
      message: 'Are you sure that you want to sign-out?',
      accept: () => {
        this.authenticationService.logout();
        this.messageService.add({severity:'success', summary:"User sign-out successfully", detail:"User sign-out successfully"});
        this.router.navigate(['/my-food/home']);
      }
    });
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
