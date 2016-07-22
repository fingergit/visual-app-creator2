import {
    Component, ViewChild, ViewContainerRef, Input, ComponentRef, ComponentResolver,
    ComponentFactory, ElementRef, Output, Injector, OnInit
} from "@angular/core";
import {LogService} from "./log.service";
import {EventEmitter} from "@angular/compiler/src/facade/async";
import {Nav} from "ionic-angular/index";
import {TabsPage} from '../pages/tabs/tabs';
import {PromiseWrapper} from "@angular/common/src/facade/promise";


// http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468

@Component({
    selector: 'dcl-wrapper',
    template: `<div #target></div>`
})
export class DyncCompLoadWrapperComponent {
    @ViewChild('target', {read: ViewContainerRef}) target:ViewContainerRef;
    @Input() type;
    cmpRef:ComponentRef<any>;
    private isViewInitialized:boolean = false;

    constructor(private resolver: ComponentResolver, private _injector: Injector) {}

    updateComponent() {
        if(!this.isViewInitialized) {
            return;
        }
    }

    compile():Promise<string>{
      let that = this;
      return new Promise((resole:any,reject:any)=>{
        let html:string = "";
        if(this.cmpRef) {
          this.cmpRef.destroy();
        }

        this.resolver.resolveComponent(C1).then((factory:ComponentFactory<any>) => {
          that.cmpRef = this.target.createComponent(factory);
          LogService.d(this.cmpRef);
          this.cmpRef.instance.myValue = "abcd";
          this.cmpRef.instance.root = TabsPage;
          if (this.cmpRef.instance.close){
            this.cmpRef.instance.close.subscribe(this.onC1Close);
          }
          let elemRef: HTMLElement = this.cmpRef.location.nativeElement;
          html = elemRef.innerHTML;
          resole(html);
        });
      }).catch(function(err){
        console.log(err);
      });
    }

    ngOnChanges() {
        this.updateComponent();
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
    }

    onC1Close(param:any){
        LogService.d('onC1Close: ' + param);
    }
}

@Component({
    selector: 'c1',
    // template: `<h2 class="testclass">c1</h2><div>{{myValue}}<input type='button' [ngModel]="myValue" (click)="closeMenu()"> </div>`,
    template: `<h2 class="testclass">c1</h2><div>{{myValue}}</div>`,
    styleUrls: []
})
export class C1 implements OnInit{
    @Input() myValue:string;
    @Output() close: EventEmitter<any> = new EventEmitter<any>();

    constructor(){
    }

    ngOnInit():any {
        return undefined;
    }

    closeMenu = ():void =>{
        this.close.emit("aaa");
    }
}
