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
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var tabs_1 = require('./pages/tabs/tabs');
var dync_comp_load_wrapper_component_1 = require("./common/dync-comp-load-wrapper.component");
var core_2 = require("@angular/core");
var splash_component_1 = require("../www/widget/splash/splash.component");
var MyApp = (function () {
    function MyApp(platform) {
        this.platform = platform;
        this.rootPage = tabs_1.TabsPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
        });
    }
    MyApp.prototype.ngAfterViewInit = function () {
        // LogService.d('after init');
        // LogService.d(this.viewChild);
        // this.viewChild.compile().then((html:string)=>{
        //   LogService.d("a: " + html);
        // });
        return undefined;
    };
    __decorate([
        core_2.ViewChild(dync_comp_load_wrapper_component_1.DyncCompLoadWrapperComponent), 
        __metadata('design:type', dync_comp_load_wrapper_component_1.DyncCompLoadWrapperComponent)
    ], MyApp.prototype, "viewChild", void 0);
    MyApp = __decorate([
        core_1.Component({
            // template: '<ion-nav [root]="rootPage"></ion-nav>'
            //   template: `<dcl-wrapper [type]="c1"></dcl-wrapper>
            // <vac-splash></vac-splash>
            // `
            template: "<ion-pane id=\"widget-container\"></ion-pane>\n",
            directives: [dync_comp_load_wrapper_component_1.DyncCompLoadWrapperComponent, splash_component_1.SplashComponent]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
ionic_angular_1.ionicBootstrap(MyApp);
//# sourceMappingURL=app.js.map