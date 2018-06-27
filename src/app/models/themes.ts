export class Theme {

    constructor(private themeName: string, private themeViewValue) {}

    public getThemeName() {
        return this.themeName;
    }
    public getThemeViewValue() {
        return this.themeViewValue;
    }
}
export const THEMES: Theme[] = [
    new Theme("success", "Green"),
    new Theme("info", "Blue"),
    new Theme("warning", "Orange"),
    new Theme("danger", "Red")
]