import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CustomersComponents } from './cutsomers/customers-registry';
import { RemoteAppDetails,RemoteMfeEvent } from "mfe-utility";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() appDetails:RemoteAppDetails;
  @Input() data:any;
  @Output() remoteEvent:EventEmitter<RemoteMfeEvent>=new EventEmitter<RemoteMfeEvent>();
  title = 'food-customers';
  @ViewChild("webCompRef",{static:true,read:ViewContainerRef}) webCompRef!:ViewContainerRef;
  public componentRef:any;

  ngAfterContentInit(): void {
    if(this.appDetails){
      this.loadComponent();
    }
  }
  loadComponent(){
    //console.log(this.data);
    this.webCompRef.clear();
    this.componentRef=this.webCompRef.createComponent<any>(CustomersComponents[this.appDetails?.key]);
    if(this.data)
    {
      for (const key in this.data) {
        this.componentRef.instance[key]=this.data[key];
       }
    }
    this.componentRef.instance.remoteEvent=this.remoteEvent;
  }
}
