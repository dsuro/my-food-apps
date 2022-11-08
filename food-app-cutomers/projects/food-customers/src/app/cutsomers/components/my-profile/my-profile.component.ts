import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RemoteEventTypes, RemoteMfeEvent } from 'mfe-utility';
import { Subject, takeUntil } from 'rxjs';
import { CustomerProfileService } from '../../../shared/services/customer-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  @Input() customerToken:string=null;
  @Output() remoteEvent:EventEmitter<RemoteMfeEvent>=new EventEmitter<RemoteMfeEvent>();
  @ViewChild('formTag') formTag:NgForm;
  customerProfileGroup: FormGroup;
  submitted:boolean=false;
  customerDetails:any;
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();
  get f() { return this.customerProfileGroup?.controls; }

  constructor(private formBuilder:FormBuilder,private customerProfileService:CustomerProfileService) { }

  ngOnInit() {
    this.getCustomerProfile(this.customerToken);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  createForms(customerDetails:any){
    if(customerDetails && customerDetails['details']){
      this.customerProfileGroup  =  this.formBuilder.group({
        emailId: [{value:customerDetails['details']['emailId'],disabled: true}, Validators.required],
        firstName: [customerDetails['details']['firstName'], Validators.required],
        lastName: [customerDetails['details']['lastName'], Validators.required],
        phone: [customerDetails['details']['phone'], Validators.required],
        address: [customerDetails['details']['address'], Validators.required],
        zipCode:[customerDetails['details']['zipCode'], Validators.required],
      });
    }
  }
  getCustomerProfile(customerToken:string){
    //console.log(customerToken);
    this.customerProfileService.getCustomerProfile(customerToken)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((response=>{
      //console.log(response);
      this.customerDetails=response['data'];
      this.createForms(this.customerDetails);
    }));
  }
  updateCustomerProfile(customerProfile){
    console.log(customerProfile);
    this.customerProfileService.updateCustomerProfile(customerProfile)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(((response:any)=>{
      if(response.success){
        this.remoteEvent.emit({type:RemoteEventTypes.DATA_SEND,data:null,source:'customers',destination:'foodShell'});
        this.getCustomerProfile(this.customerToken);
      }
    }));
  }
  onUpdate(){
    if(this.formTag){
      this.formTag.ngSubmit.emit();
    }
  }
  onCancel(){
    if(this.customerProfileGroup){
      this.submitted=false;
      this.customerProfileGroup.reset();
      this.createForms(this.customerDetails);
    }
  }
  onSubmit(){
    //console.log(this.dynamicForm.value);
    this.submitted=true;
    if(this.customerProfileGroup.valid){
      const customerDetails=this.customerProfileGroup.getRawValue();
      const customerProfile={
        customerToken:this.customerDetails.customerToken,
        userId:this.customerDetails.userId,
        password:this.customerDetails.password,
        details:customerDetails
     };
     this.updateCustomerProfile(customerProfile);
    }else{
      return;
    }
  }
}
