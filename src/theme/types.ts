export enum Colors {
  primary = 0,
  red,
  green,
  yellow,
  blue,
  grey,
  text,
  txt,
  dark,
  light,
  white,
  black,
}

export enum INameStyle {
  dark = 0,
  light,
}

export enum IMoodColor {
  lightest = -2,
  lighter,
  default,
  darker,
  darkest,
}
export interface ISizing {
  radiusBig: number;
  padding: number;
  radius: number;
  radiusLg: number;
  radiusSm: number;
  fontSize: string;
  fontSizeLg: string;
  fontSizeSm: string;
  btn: {
    square: string;
    squareLg: string;
    squareSm: string;
    padding: string;
  };
  input: {
    padding: string;
    paddingLg: string;
    paddingSm: string;
  };
}

export interface IStyle {
  name: INameStyle;
  color: Record<Colors, string>;
  sizing: ISizing;
}

export interface IUseStyle extends IStyle {
  onChange: (name: INameStyle) => void;
  getColor: (
    name?: keyof typeof Colors,
    mood?: IMoodColor,
    opacity?: number
  ) => string;
}

export interface IThemeColor {
  name: keyof typeof Colors;
  hover?: keyof typeof Colors;
  active?: keyof typeof Colors;
  opacity: number;
  mood: IMoodColor;
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
  dictionary: IDictionary;
  onChange: (code: ILocale) => void;
}

export interface ThemeInterface {
  style: IUseStyle,
  lang: IUseLang;
}
declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface { }
}
