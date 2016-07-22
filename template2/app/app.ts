import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {DyncCompLoadWrapperComponent} from "./common/dync-comp-load-wrapper.component";
import {ViewChild} from "@angular/core";
import {LogService} from "./common/log.service";
import {SplashComponent} from "../www/widget/splash/splash.component";


@Component({
  // template: '<ion-nav [root]="rootPage"></ion-nav>'
//   template: `<dcl-wrapper [type]="c1"></dcl-wrapper>
// <vac-splash></vac-splash>
// `
  template: `<ion-pane id="widget-container"></ion-pane>
`
  ,directives: [DyncCompLoadWrapperComponent,SplashComponent]
})
export class MyApp {
  @ViewChild(DyncCompLoadWrapperComponent) viewChild:DyncCompLoadWrapperComponent;

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngAfterViewInit():any {
    // LogService.d('after init');
    // LogService.d(this.viewChild);
    // this.viewChild.compile().then((html:string)=>{
    //   LogService.d("a: " + html);
    // });
    return undefined;
  }
}

ionicBootstrap(MyApp);
