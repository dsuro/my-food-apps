import { Component, ElementRef, OnInit, Renderer2, ViewChild,Input,SimpleChanges, Optional, Output, EventEmitter } from '@angular/core';
import { loadRemoteModule} from '@angular-architects/module-federation';
import { Configurations } from './configurations';
import { RemoteAppDetails } from './remote-app-details';

@Component({
  selector: 'lib-mfe-wrapper',
  template: `<div #vc></div>`,
  styles: []
})
export class MfeWrapperComponent implements OnInit {
  @Input() remoteAppDetails:RemoteAppDetails;
  @Input() data:any;
  @Output() mfeEvent:EventEmitter<any>=new EventEmitter<any>();
  @ViewChild("vc",{static:true,read:ElementRef}) vc!:ElementRef;
  customElement:any;
  environment:any;

  constructor(private renderer:Renderer2,@Optional() config?: Configurations) { 
    this.environment=config.environment;
  }
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
    if(this.remoteAppDetails.remoteAppName && this.environment){
      const loadOptions=this.environment[this.remoteAppDetails.remoteAppName] as any;
      const loadRemoteApp=()=>loadRemoteModule(loadOptions);
      loadRemoteApp().then((_:any)=>{
        this.createCustomElement();
        const message=`Element ${this.remoteAppDetails.customElement} loaded for key ${this.remoteAppDetails.key}`;
        console.log(message);
      })
      .catch((err:any)=>{
        const message=`Error while loading ${this.remoteAppDetails.customElement} loaded for key ${this.remoteAppDetails.key}`;
        console.log(message);
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
      this.mfeEvent.emit(event);
    });
    this.vc.nativeElement.appendChild(this.customElement);
  }
}
