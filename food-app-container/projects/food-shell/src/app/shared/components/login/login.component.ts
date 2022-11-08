import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted  =  false;
  loginFailed=false;
  errorMessage:string="";
  destroyNotifier$:Subject<boolean>=new Subject<boolean>();
  get f() { return this.loginForm?.controls; }


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.createForms();
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next(false);
    this.destroyNotifier$.complete();
  }
  createForms(){
    this.loginForm  =  this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public login(){
    //console.log(this.loginForm.value);
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    //this.loadingService.setLoader(true);
    this.authenticationService.login(this.loginForm.value)
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((response:any)=>{
      //console.log(response);
      if(response){
        if(response.success)
        {
          //console.log(response.message);
          this.authenticationService.userTokenData=response.data;
          this.router.navigate(['/my-food/home']);
      
        }else{
          this.loginFailed=true;
          this.errorMessage="Please check UserId/Password";
          //this.loadingService.setLoader(false);
        }
      }
      else{
        this.loginFailed=true;
        this.errorMessage="Server error";
        //this.loadingService.setLoader(false);
      }
    });
  }
  goToBack(){
    this.router.navigate(['/my-food/home']);
  }
}
