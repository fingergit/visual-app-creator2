/**
 * Created by laj on 2016/7/5.
 */
export class VacTextAlign{
    constructor(public name: string
                ,public value: string
    ){}
}

export class VacTextAlignSet{
    left = new VacTextAlign('left', 'left');
    center = new VacTextAlign('center', 'center');
    right = new VacTextAlign('right', 'right');
}
