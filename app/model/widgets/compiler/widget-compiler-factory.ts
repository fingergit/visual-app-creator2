import {WidgetCompiler} from "./widget-compiler";
import {CommonWidgetCompiler} from "./common-widget-compiler";
import {VacMap} from "../../../common/map";
import {ListWidgetCompiler} from "./list-view-compiler";
import {SplashCompiler} from "./splash-compiler";
/**
 * Created by laj on 2016/7/15.
 */

export class WidgetCompilerType{
    static common = 'common';
    static list = 'list';
    static splash = 'splash';
}

export class WidgetCompilerFactory{
    static compilerMap: VacMap<WidgetCompiler> = new VacMap<WidgetCompiler>();

    static queryCompiler(type: string):WidgetCompiler{
        let compiler: WidgetCompiler = null;
        compiler = WidgetCompilerFactory.compilerMap.get(type);
        if (compiler){
            return compiler;
        }

        switch (type){
            case WidgetCompilerType.common:
                compiler = new CommonWidgetCompiler();
                break;
            case WidgetCompilerType.list:
                compiler = new ListWidgetCompiler();
                break;
            case WidgetCompilerType.splash:
                compiler = new SplashCompiler();
                break;
        }
        WidgetCompilerFactory.compilerMap.set(type, compiler);

        return compiler;
    }
}