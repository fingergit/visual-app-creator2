import {
    Component, ViewChild, ViewContainerRef, Input, ComponentRef, ComponentResolver,
    ComponentFactory, ElementRef, Output, Injector, OnInit
} from "@angular/core";
import {LogService} from "./log.service";
import {EventEmitter} from "@angular/compiler/src/facade/async";


// http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468

@Component({
    selector: 'dcl-wrapper',
    template: `<div #target></div>`
})
export class DclWrapperComponent {
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

    compile(){
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
        this.resolver.resolveComponent(C1).then((factory:ComponentFactory<any>) => {
            this.cmpRef = this.target.createComponent(factory);
            LogService.d(this.cmpRef);
            this.cmpRef.instance.myValue = "abcd";
            if (this.cmpRef.instance.close){
                this.cmpRef.instance.close.subscribe(this.onC1Close);
            }
            let elemRef: HTMLElement = this.cmpRef.location.nativeElement;
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
    template: `<h2 class="testclass">c1</h2><div>{{myValue}}<input type='button' [ngModel]="myValue" (click)="closeMenu()"> </div>`,
    styleUrls: ['app/page/home/toolbar/toolbar.component.css']
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