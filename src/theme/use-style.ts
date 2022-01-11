import { useCallback, useEffect, useState } from "react";
import {convertRgb,lightenDarkenColor} from "constants/utilityColor";
import {lightStyle,darkStyle} from "./colors";

type INameStyle = "dark" | "light";
type IMoodColor = "darker" | "darkest" | "lighter" | "lightest";
interface IStyle {
    name: INameStyle;
    color: {
        [index: string]: string
    }
}
export interface IUseStyle extends IStyle {
    onChange: (name: INameStyle) => void;
    getColor: (name?: string,opacity?:number,mood?: IMoodColor) => string;
}

const localStyle = localStorage.getItem('style');
let defaultStyle = lightStyle;
if (localStyle === "dark" || localStyle === "light") {
    defaultStyle = localStyle === "dark" ? darkStyle : lightStyle;
} else {
    try {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            defaultStyle = darkStyle;
        }
    }catch (e){}
}
const useStyle = (): IUseStyle => {
    const [style, setStyle] = useState<IStyle>(defaultStyle);

    const getColor: IUseStyle['getColor'] = useCallback((name, opacity,mood) => {
        const rgbaColor = convertRgb(style.color[name ? name : 'primary']);
        opacity = opacity ? opacity : 1;
        switch (mood) {
            case "darker": {
                return lightenDarkenColor(rgbaColor, -30,opacity);
            }
            case "darkest": {
                return lightenDarkenColor(rgbaColor, -60,opacity);
            }
            case "lighter": {
                return lightenDarkenColor(rgbaColor, 30,opacity);
            }
            case "lightest": {
                return lightenDarkenColor(rgbaColor, 60,opacity);
            }
            default: {
                return lightenDarkenColor(rgbaColor, 0,opacity);
            }
        }

    }, [style.color])

    useEffect(()=>{
        try {
            if (window.matchMedia) {
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .addEventListener('change', e => {
                        onChange(e.matches
                            ? "dark"
                            : "light");
                    });
            }
        }catch (e){
            console.log(e);
            
        }
        const changeStorage = ()=>{
            const style = localStorage.getItem('style');
            if (style === "dark" || style === "light") {
                onChange(style)
            }
        }
         window.addEventListener('storage', changeStorage);
         return ()=>{
             window.removeEventListener('storage', changeStorage);
             try {
                if (window.matchMedia) {
                    window
                        .matchMedia('(prefers-color-scheme: dark)')
                        .removeEventListener('change',()=>false);
                }
            }catch (e){}
         }
    },[])
    const onChange: IUseStyle['onChange'] = (name) => {
        localStorage.setItem('style',name);
        switch (name) {
            case "dark": {
                setStyle(darkStyle);
                return false;
            };
            default: {
                setStyle(lightStyle);
                return false;
            }
        }
    }

    return {
        ...style,
        onChange,
        getColor
    };
}

export default useStyle;