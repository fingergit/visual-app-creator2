import {provideRouter, RouterConfig} from "@angular/router";

export const routes: RouterConfig = [
    // ...HeroesRoutes, // 合并子route(注意前面的三个点，将里面的元素分散到外面的数组中)。
    // ...CrisisCenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
    // provideRouter(routes)
    // ,CanDeactivateGuard
];