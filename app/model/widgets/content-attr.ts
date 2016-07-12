import {VacWidgetAttr} from "../widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../attr-type";
import {VacMap} from "../../common/map";
/**
 * Created by laj on 2016/7/4.
 */

export class EVacScrollDirectionRange{
    static x = new VacAttrEnumComboxItem('横向', 'x');
    static y = new VacAttrEnumComboxItem('纵向', 'y');
    static xy = new VacAttrEnumComboxItem('双向', 'xy');
}

export class VacContentAttr extends VacWidgetAttr{
    static STYLE_SCROLL_DIR_RANGE: VacMap<EVacScrollDirectionRange>;

    public delegateHandle: VacWidgetAttrValue;
    public direction: VacWidgetAttrValue;
    public locking: VacWidgetAttrValue;

    constructor(){
        super('内容区');

        VacContentAttr.STYLE_SCROLL_DIR_RANGE = VacWidgetAttr.initRange(VacContentAttr.STYLE_SCROLL_DIR_RANGE, EVacScrollDirectionRange);

        this.delegateHandle = new VacWidgetAttrValue('delegate-handle', '', EVacWidgetAttrType.text, null);
        this.direction = new VacWidgetAttrValue('滚动方向', EVacScrollDirectionRange.y, EVacWidgetAttrType.enumCombBox, VacContentAttr.STYLE_SCROLL_DIR_RANGE);
        this.locking = new VacWidgetAttrValue('锁定', true, EVacWidgetAttrType.boolSwitch, null);
    }

    newInstance(){
        return new VacContentAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacContentAttr>src;
        for (let key in src){
            if (!src.hasOwnProperty(key)){
                continue;
            }
            let item = src[key];
            if (!(item instanceof VacWidgetAttrValue)){
                continue;
            }
            this[key] = src2[key].clone();
        }
    }
}

