import { Component, OnInit } from '@angular/core';
import { RemoteAppDetails } from 'mfe-utility';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  customerAppDetails:RemoteAppDetails={
    remoteAppName:'customers',
    customElement:'food-customer-element',
    key:'myProfile'
  };
  data:any={"customerToken":null};
  constructor(private authenticationService:AuthenticationService,private messageService: MessageService) { }

  ngOnInit() {
    //console.log(this.authenticationService.userTokenData);
    if(this.authenticationService.userTokenData){
      this.data={"customerToken":this.authenticationService.userTokenData['customerToken']};
    }
  }
  onCustomerProfieUpdate(event){
	  if(event){
		this.messageService.add({severity:'success', summary:'Profile updated successfully', detail:'Profile updated successfully'});
	  }
  }

}
