import {VacMap} from "../../common/map";
import {LogService} from "../../common/log.service";
import {VacWidgetAttrValue, EVacWidgetAttrType, VacAttrEnumComboxItem} from "./widget-attr-type";
/**
 * Created by laj on 2016/7/4.
 */

export class EVacPositionRange{
    static static = new VacAttrEnumComboxItem('默认', 'static');
    static relative = new VacAttrEnumComboxItem('相对', 'relative');
    static absolute = new VacAttrEnumComboxItem('绝对', 'absolute');
    static fixed = new VacAttrEnumComboxItem('固定', 'fixed');
    static inherit = new VacAttrEnumComboxItem('继承', 'inherit');
}

export class EVacFloatRange{
    static none = new VacAttrEnumComboxItem('默认', 'none');
    static left = new VacAttrEnumComboxItem('左', 'left');
    static right = new VacAttrEnumComboxItem('右', 'right');
    static inherit = new VacAttrEnumComboxItem('继承', 'inherit');
}

export class EVacBorderStyleRange{
    static none = new VacAttrEnumComboxItem('默认', 'none');
    static solid = new VacAttrEnumComboxItem('实线', 'solid');
    static dotted = new VacAttrEnumComboxItem('点', 'dotted');
    static dashed = new VacAttrEnumComboxItem('虚线', 'dashed');
    static groove = new VacAttrEnumComboxItem('3D 凹槽', 'groove');
    static ridge = new VacAttrEnumComboxItem('3D 垄状', 'ridge');
    static inset = new VacAttrEnumComboxItem('3D inset', 'inset');
    static outset = new VacAttrEnumComboxItem('3D outset', 'outset');
    static hidden = new VacAttrEnumComboxItem('隐藏', 'hidden');
    static inherit = new VacAttrEnumComboxItem('继承', 'inherit');
}

export abstract class VacWidgetAttr{
    constructor(public name:string){}

    abstract newInstance();
    copyFrom(src:VacWidgetAttr){
        this.name = src.name;

        for (let key in src){
            if (!src.hasOwnProperty(key)){
                continue;
            }
            let item = src[key];
            if (item instanceof VacWidgetAttrValue){
                this[key] = item.clone();
            }
        }
    }

    clone(){
        let attr: VacWidgetAttr = this.newInstance();
        attr.copyFrom(this);
        return attr;
    }

    fromJsonObj(obj:Object, widgetType: string) {
        do{
            if (!obj || !obj.hasOwnProperty('name')){
                LogService.d("invalid project element: ");
                LogService.d(obj);
                break;
            }

            for (let key in obj){
                if (!this.hasOwnProperty(key)){
                    continue;
                }

                let item = obj[key];
                if (!this.fromJsonObjKey(key, item, obj)){
                    LogService.d("not processed key: " + key);
                }
            }

        }while(false);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        let done:boolean = false;
        if (key === 'name'){
            this[key] = value;
            done = true;
        }
        else if (this.hasOwnProperty(key) && this[key] instanceof VacWidgetAttrValue){
            this[key].fromJsonObj(value);
            done = true;
        }
        return done;
    }

        /**
     * 初始化带有取值范围的属性的取值范围
     * @param range 要返回的取值范围。
     * @param rangeClass 存放枚举值的类名。
     * @returns {VacMap<T>} 取值范围。
     */
    static initRange<T>(range: VacMap<T>, rangeClass:any):VacMap<T>{
        if (!range){
            range = new VacMap<T>();
            for (let key in rangeClass){
                if (!rangeClass.hasOwnProperty(key)){
                    continue;
                }
                let item = rangeClass[key];
                range.set(key, item);
            }
        }
        return range;
    }
}

export class VacWidgetTextAttr extends VacWidgetAttr{
    constructor(){
        super('文本');
    }

    newInstance(){
        return new VacWidgetTextAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacWidgetTextAttr>src;
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

export class VacWidgetPositionAttr extends VacWidgetAttr{
    static POSITION_RANGE: VacMap<EVacPositionRange>;
    static FLOAT_RANGE: VacMap<EVacFloatRange>;

    public position: VacWidgetAttrValue;

    public center: VacWidgetAttrValue;
    public middle: VacWidgetAttrValue;

    public float: VacWidgetAttrValue;
    public floatLeft: VacWidgetAttrValue;
    public floatRight: VacWidgetAttrValue;
    public floatTop: VacWidgetAttrValue;
    public floatBottom: VacWidgetAttrValue;

    constructor(){
        super('位置');

        VacWidgetPositionAttr.POSITION_RANGE = VacWidgetPositionAttr.initRange(VacWidgetPositionAttr.POSITION_RANGE, EVacPositionRange);
        VacWidgetPositionAttr.FLOAT_RANGE = VacWidgetPositionAttr.initRange(VacWidgetPositionAttr.FLOAT_RANGE, EVacFloatRange);

        this.position = new VacWidgetAttrValue('位置', EVacPositionRange.static, EVacWidgetAttrType.enumCombBox, VacWidgetPositionAttr.POSITION_RANGE);
        this.center = new VacWidgetAttrValue('水平居中', false, EVacWidgetAttrType.boolSwitch, null);
        this.middle = new VacWidgetAttrValue('垂直居中', false, EVacWidgetAttrType.boolSwitch, null);
        this.float = new VacWidgetAttrValue('浮动', EVacFloatRange.none, EVacWidgetAttrType.enumCombBox, VacWidgetPositionAttr.FLOAT_RANGE);
        this.floatLeft = new VacWidgetAttrValue('浮动(左)', 'auto', EVacWidgetAttrType.text, null);
        this.floatRight = new VacWidgetAttrValue('浮动(右)', 'auto', EVacWidgetAttrType.text, null);
        this.floatTop = new VacWidgetAttrValue('浮动(上)', 'auto', EVacWidgetAttrType.text, null);
        this.floatBottom = new VacWidgetAttrValue('浮动(下)', 'auto', EVacWidgetAttrType.text, null);
    }

    newInstance(){
        return new VacWidgetPositionAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacWidgetPositionAttr>src;
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

export class VacWidgetBorderAttr extends VacWidgetAttr{
    static BORDER_STYLE_RANGE: VacMap<EVacBorderStyleRange>;

    public marginLeft: VacWidgetAttrValue;
    public marginRight: VacWidgetAttrValue;
    public marginTop: VacWidgetAttrValue;
    public marginBottom: VacWidgetAttrValue;

    public paddingLeft: VacWidgetAttrValue;
    public paddingRight: VacWidgetAttrValue;
    public paddingTop: VacWidgetAttrValue;
    public paddingBottom: VacWidgetAttrValue;

    public leftColor: VacWidgetAttrValue;
    public leftStyle: VacWidgetAttrValue;
    public leftWidth: VacWidgetAttrValue;

    public rightColor: VacWidgetAttrValue;
    public rightStyle: VacWidgetAttrValue;
    public rightWidth: VacWidgetAttrValue;

    public topColor: VacWidgetAttrValue;
    public topStyle: VacWidgetAttrValue;
    public topWidth: VacWidgetAttrValue;

    public bottomColor: VacWidgetAttrValue;
    public bottomStyle: VacWidgetAttrValue;
    public bottomWidth: VacWidgetAttrValue;

    public tlRadius: VacWidgetAttrValue;
    public trRadius: VacWidgetAttrValue;
    public blRadius: VacWidgetAttrValue;
    public brRadius: VacWidgetAttrValue;

    constructor(){
        super('边框');
        VacWidgetBorderAttr.BORDER_STYLE_RANGE = VacWidgetPositionAttr.initRange(VacWidgetBorderAttr.BORDER_STYLE_RANGE, EVacBorderStyleRange);

        this.marginLeft = new VacWidgetAttrValue('外边(左)', '0', EVacWidgetAttrType.text, null);
        this.marginRight = new VacWidgetAttrValue('外边(右)', '0', EVacWidgetAttrType.text, null);
        this.marginTop = new VacWidgetAttrValue('外边(上)', '0', EVacWidgetAttrType.text, null);
        this.marginBottom = new VacWidgetAttrValue('外边(下)', '0', EVacWidgetAttrType.text, null);

        this.paddingLeft = new VacWidgetAttrValue('内边(左)', '0', EVacWidgetAttrType.text, null);
        this.paddingRight = new VacWidgetAttrValue('内边(右)', '0', EVacWidgetAttrType.text, null);
        this.paddingTop = new VacWidgetAttrValue('内边(上)', '0', EVacWidgetAttrType.text, null);
        this.paddingBottom = new VacWidgetAttrValue('内边(下)', '0', EVacWidgetAttrType.text, null);

        this.leftColor = new VacWidgetAttrValue('边色(左)', 'transparent', EVacWidgetAttrType.color, null);
        this.leftStyle = new VacWidgetAttrValue('样式(左)', EVacBorderStyleRange.none, EVacWidgetAttrType.enumCombBox, VacWidgetBorderAttr.BORDER_STYLE_RANGE);
        this.leftWidth = new VacWidgetAttrValue('宽度(左)', 'medium', EVacWidgetAttrType.text, null);

        this.rightColor = new VacWidgetAttrValue('边色(右)', 'transparent', EVacWidgetAttrType.color, null);
        this.rightStyle = new VacWidgetAttrValue('样式(右)', EVacBorderStyleRange.none, EVacWidgetAttrType.enumCombBox, VacWidgetBorderAttr.BORDER_STYLE_RANGE);
        this.rightWidth = new VacWidgetAttrValue('宽度(右)', 'medium', EVacWidgetAttrType.text, null);

        this.topColor = new VacWidgetAttrValue('边色(上)', 'transparent', EVacWidgetAttrType.color, null);
        this.topStyle = new VacWidgetAttrValue('样式(上)', EVacBorderStyleRange.none, EVacWidgetAttrType.enumCombBox, VacWidgetBorderAttr.BORDER_STYLE_RANGE);
        this.topWidth = new VacWidgetAttrValue('宽度(上)', 'medium', EVacWidgetAttrType.text, null);

        this.bottomColor = new VacWidgetAttrValue('边色(下)', 'transparent', EVacWidgetAttrType.color, null);
        this.bottomStyle = new VacWidgetAttrValue('样式(下)', EVacBorderStyleRange.none, EVacWidgetAttrType.enumCombBox, VacWidgetBorderAttr.BORDER_STYLE_RANGE);
        this.bottomWidth = new VacWidgetAttrValue('宽度(下)', 'medium', EVacWidgetAttrType.text, null);

        this.tlRadius = new VacWidgetAttrValue('圆角(左上)', '0', EVacWidgetAttrType.text, null);
        this.trRadius = new VacWidgetAttrValue('圆角(右上)', '0', EVacWidgetAttrType.text, null);
        this.blRadius = new VacWidgetAttrValue('圆角(左下)', '0', EVacWidgetAttrType.text, null);
        this.brRadius = new VacWidgetAttrValue('圆角(右下)', '0', EVacWidgetAttrType.text, null);
    }

    newInstance(){
        return new VacWidgetBorderAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacWidgetBorderAttr>src;
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

export class VacWidgetAttrs {
    text = new VacWidgetTextAttr();
    position = new VacWidgetPositionAttr();
    border = new VacWidgetBorderAttr();
    custom:VacWidgetAttr = null;

    constructor(custom?:VacWidgetAttr) {
        this.custom = custom;
    }

    clone() {
        let custom:VacWidgetAttr = null;
        if (this.custom) {
            custom = this.custom.clone();
        }

        let newAttrs = new VacWidgetAttrs(custom);
        for (let key in this) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }
            let item = this[key];
            if (item instanceof VacWidgetAttr) {
                newAttrs[key] = item.clone();
            }
        }

        return newAttrs;
    }
}