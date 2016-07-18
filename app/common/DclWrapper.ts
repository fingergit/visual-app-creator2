import {
    Component, ViewChild, ViewContainerRef, Input, ComponentRef, ComponentResolver,
    ComponentFactory, ElementRef
} from "@angular/core";
import {LogService} from "./log.service";


// http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468

@Component({
    selector: 'dcl-wrapper',
    template: `<div #target></div>`
})
export class DclWrapper {
    @ViewChild('target', {read: ViewContainerRef}) target:ViewContainerRef;
    @Input() type;
    cmpRef:ComponentRef<any>;
    private isViewInitialized:boolean = false;

    constructor(private resolver: ComponentResolver) {}

    updateComponent() {
        if(!this.isViewInitialized) {
            return;
        }
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
//    this.dcl.loadNextToLocation(this.type, this.target).then((cmpRef) => {
//         this.resolver.resolveComponent(this.type).then((factory:ComponentFactory<any>) => {
        this.resolver.resolveComponent(C1).then((factory:ComponentFactory<any>) => {
            this.cmpRef = this.target.createComponent(factory);
            LogService.d(this.cmpRef);
            let elemRef: HTMLElement = this.cmpRef.location.nativeElement;
            this.target.clear();
            $("#testDiv").append($(elemRef.outerHTML));
            LogService.d(elemRef.outerHTML);
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
}

@Component({
    selector: 'c1',
    template: `<h2 class="testclass">c1</h2>`,
    styleUrls: ['app/page/home/toolbar/toolbar.component.css']
})
export class C1 {
}