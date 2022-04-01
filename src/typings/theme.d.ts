export type Colors = "primary" | "red" | "green" | "yellow" | "blue" | "grey" | "text" | "txt" | "dark" | "light" | "white" | "black";

export type INameStyle = "dark" | "light";
export type IMoodColor = "darker" | "darkest" | "lighter" | "lightest";

export interface ISizing {
    radiusBig: number,
    padding: number,
    radius: number,
    radiusLg: number,
    radiusSm: number,
    fontSize: string,
    fontSizeLg: string,
    fontSizeSm: string,
    btn: {
        square: string,
        squareLg: string,
        squareSm: string,
        padding: string,
    },
    input: {
        padding: string,
        paddingLg: string,
        paddingSm: string,
    }
}

export interface IStyle {
    name: INameStyle;
    color: {
        [index: string]: string
    },
    sizing: ISizing
}

export interface IUseStyle extends IStyle {
    onChange: (name: INameStyle) => void;
    getColor: (name?: Colors, mood?: IMoodColor, opacity?: number) => string;
}


export interface IThemeColor {
    name: Colors,
    hover? : Colors,
    active? : Colors,
    opacity: number,
    mood: IMoodColor,
}


export type ILocale = "fa-IR" | "en-US";

export interface IDictionary {
    "theme.locale": ILocale;
    "theme.language": string;
    "theme.langLabel": string;
    "theme.dir": "ltr" | "rtl";
    [index: string]: string;
}
export interface IUseLang {
    dictionary: IDictionary,
    onChange: (code: ILocale) => void;
}