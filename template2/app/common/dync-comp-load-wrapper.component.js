"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var log_service_1 = require("./log.service");
var async_1 = require("@angular/compiler/src/facade/async");
var tabs_1 = require('../pages/tabs/tabs');
// http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468
var DyncCompLoadWrapperComponent = (function () {
    function DyncCompLoadWrapperComponent(resolver, _injector) {
        this.resolver = resolver;
        this._injector = _injector;
        this.isViewInitialized = false;
    }
    DyncCompLoadWrapperComponent.prototype.updateComponent = function () {
        if (!this.isViewInitialized) {
            return;
        }
    };
    DyncCompLoadWrapperComponent.prototype.compile = function () {
        var _this = this;
        var that = this;
        return new Promise(function (resole, reject) {
            var html = "";
            if (_this.cmpRef) {
                _this.cmpRef.destroy();
            }
            _this.resolver.resolveComponent(C1).then(function (factory) {
                that.cmpRef = _this.target.createComponent(factory);
                log_service_1.LogService.d(_this.cmpRef);
                _this.cmpRef.instance.myValue = "abcd";
                _this.cmpRef.instance.root = tabs_1.TabsPage;
                if (_this.cmpRef.instance.close) {
                    _this.cmpRef.instance.close.subscribe(_this.onC1Close);
                }
                var elemRef = _this.cmpRef.location.nativeElement;
                html = elemRef.innerHTML;
                resole(html);
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    DyncCompLoadWrapperComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    DyncCompLoadWrapperComponent.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
        this.updateComponent();
    };
    DyncCompLoadWrapperComponent.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    DyncCompLoadWrapperComponent.prototype.onC1Close = function (param) {
        log_service_1.LogService.d('onC1Close: ' + param);
    };
    __decorate([
        core_1.ViewChild('target', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], DyncCompLoadWrapperComponent.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DyncCompLoadWrapperComponent.prototype, "type", void 0);
    DyncCompLoadWrapperComponent = __decorate([
        core_1.Component({
            selector: 'dcl-wrapper',
            template: "<div #target></div>"
        }), 
        __metadata('design:paramtypes', [core_1.ComponentResolver, core_1.Injector])
    ], DyncCompLoadWrapperComponent);
    return DyncCompLoadWrapperComponent;
}());
exports.DyncCompLoadWrapperComponent = DyncCompLoadWrapperComponent;
var C1 = (function () {
    function C1() {
        var _this = this;
        this.close = new async_1.EventEmitter();
        this.closeMenu = function () {
            _this.close.emit("aaa");
        };
    }
    C1.prototype.ngOnInit = function () {
        return undefined;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], C1.prototype, "myValue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', async_1.EventEmitter)
    ], C1.prototype, "close", void 0);
    C1 = __decorate([
        core_1.Component({
            selector: 'c1',
            // template: `<h2 class="testclass">c1</h2><div>{{myValue}}<input type='button' [ngModel]="myValue" (click)="closeMenu()"> </div>`,
            template: "<h2 class=\"testclass\">c1</h2><div>{{myValue}}</div>",
            styleUrls: []
        }), 
        __metadata('design:paramtypes', [])
    ], C1);
    return C1;
}());
exports.C1 = C1;
//# sourceMappingURL=dync-comp-load-wrapper.component.js.map