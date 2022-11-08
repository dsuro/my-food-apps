import { Component, ElementRef, OnInit, Renderer2, ViewChild,Input,SimpleChanges } from '@angular/core';
import { loadRemoteModule} from '@angular-architects/module-federation';
import { environment } from 'projects/food-shell/src/environments/environment';

@Component({
  selector: 'app-mfe-wrapper',
  templateUrl: './mfe-wrapper.component.html',
  styleUrls: ['./mfe-wrapper.component.css']
})
export class MfeWrapperComponent implements OnInit {
  @Input() remoteAppDetails:any;
  @Input() data:any;
  @ViewChild("vc",{static:true,read:ElementRef}) vc!:ElementRef;
  customElement:any;

  constructor(private renderer:Renderer2) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['remoteAppDetails'] && changes['remoteAppDetails'].currentValue !=changes['remoteAppDetails'].previousValue){
      this.importRemoteApp();
    }
    if(changes && changes['data'] && changes['data'].currentValue !=changes['data'].previousValue){
      this.importRemoteApp();
    }
  }
  importRemoteApp(){
    if(this.remoteAppDetails.remoteAppName){
      const loadOptions=environment[this.remoteAppDetails['remoteAppName']] as any;
      const loadRemoteApp=()=>loadRemoteModule(loadOptions);
      loadRemoteApp().then((_:any)=>{
        this.createCustomElement();
        console.log('component loaded');
      }).catch((err:any)=>{
        console.log(err);
      })
    }
  }
  createCustomElement(){
    const childElements=this.vc.nativeElement.childNodes;
    for (const child of childElements) {
      this.renderer.removeChild(this.vc.nativeElement,child);
    }
    this.customElement=document.createElement(this.remoteAppDetails.customElement);
    this.customElement['appDetails']=this.remoteAppDetails;
    this.customElement['data']=this.data;
    this.customElement.addEventListener('remoteEvent',(event:any)=>{
      console.log(event['detail']);
    });
    this.vc.nativeElement.appendChild(this.customElement);
  }
}
