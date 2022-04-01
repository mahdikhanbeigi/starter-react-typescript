import { useCallback, useEffect, useState } from "react";
import {convertRgb,lightenDarkenColor} from "constants/utilityColor";
import {lightStyle,darkStyle} from "./colors";
import sizing from "./sizing";
import {IUseStyle,IStyle} from "typings/theme";


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
    const [style, setStyle] = useState<IStyle>({
        ...defaultStyle,
        sizing
    });

    const getColor: IUseStyle['getColor'] = useCallback((name,mood,opacity) => {
        const rgbaColor = convertRgb(style.color[name ? name : 'primary']);
        opacity = typeof opacity !== "undefined" ? opacity : 1;
        switch (mood) {
            case "darker": {
                return lightenDarkenColor(rgbaColor, -15,opacity);
            }
            case "darkest": {
                return lightenDarkenColor(rgbaColor, -30,opacity);
            }
            case "lighter": {
                return lightenDarkenColor(rgbaColor, 15,opacity);
            }
            case "lightest": {
                return lightenDarkenColor(rgbaColor, 30,opacity);
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
        }catch (e){}
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
                setStyle(prev=>({
                    ...prev,
                    ...darkStyle,
                }));
                return false;
            };
            default: {
                setStyle(prev=>({
                    ...prev,
                    ...lightStyle,
                }));
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