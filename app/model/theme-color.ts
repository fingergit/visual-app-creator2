/**
 * Created by laj on 2016/7/5.
 */
export class VacThemeColor{
    constructor(public name: string
                ,public value: string
    ){}
}

export class VacThemeColorSet{
    light = new VacThemeColor('light', 'light');
    stable = new VacThemeColor('stable', 'stable');
    positive = new VacThemeColor('positive', 'positive');
    calm = new VacThemeColor('calm', 'calm');
    balanced = new VacThemeColor('balanced', 'balanced');
    energized = new VacThemeColor('energized', 'energized');
    assertive = new VacThemeColor('assertive', 'assertive');
    royal = new VacThemeColor('royal', 'royal');
    dark = new VacThemeColor('dark', 'dark');
}
