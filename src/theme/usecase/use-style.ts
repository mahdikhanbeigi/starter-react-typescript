import { useCallback, useEffect, useState } from "react";
import {
  convertRgb,
  lightenDarkenColor,
  lightStyle,
  darkStyle,
  IUseStyle,
  IStyle,
  sizing,
  INameStyle,
} from "theme";
import { Colors } from "theme/types";
const localStyle = localStorage.getItem("style");
let defaultStyle = lightStyle;
if (localStyle === "dark" || localStyle === "light") {
  defaultStyle = localStyle === "dark" ? darkStyle : lightStyle;
} else {
  try {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      defaultStyle = darkStyle;
    }
  } catch (e) {}
}
export const useStyle = (): IUseStyle => {
  const [style, setStyle] = useState<IStyle>({
    ...defaultStyle,
    sizing,
  });

  const getColor: IUseStyle["getColor"] = useCallback(
    (name, mood, opacity) => {
      const rgbaColor = convertRgb(
        style.color[name ? Colors[name] : Colors["primary"]]
      );
      opacity = typeof opacity !== "undefined" ? opacity : 1;
      switch (mood) {
        case -1: {
          return lightenDarkenColor(rgbaColor, -15, opacity);
        }
        case -2: {
          return lightenDarkenColor(rgbaColor, -30, opacity);
        }
        case 1: {
          return lightenDarkenColor(rgbaColor, 15, opacity);
        }
        case 2: {
          return lightenDarkenColor(rgbaColor, 30, opacity);
        }
        default: {
          return lightenDarkenColor(rgbaColor, 0, opacity);
        }
      }
    },
    [style.color]
  );

  useEffect(() => {
    try {
      if (window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            onChange(e.matches ? INameStyle["dark"] : INameStyle["light"]);
          });
      }
    } catch (e) {}
    const changeStorage = () => {
      const style = localStorage.getItem("style");
      if (style === "dark" || style === "light") {
        onChange(INameStyle[style]);
      }
    };
    window.addEventListener("storage", changeStorage);
    return () => {
      window.removeEventListener("storage", changeStorage);
      try {
        if (window.matchMedia) {
          window
            .matchMedia("(prefers-color-scheme: dark)")
            .removeEventListener("change", () => false);
        }
      } catch (e) {}
    };
  }, []);
  const onChange: IUseStyle["onChange"] = (name) => {
    localStorage.setItem("style", INameStyle[name]);
    switch (name) {
      case 0:
        return setStyle((prev) => ({
          ...prev,
          ...darkStyle,
        }));
      default:
        return setStyle((prev) => ({
          ...prev,
          ...lightStyle,
        }));
    }
  };

  return {
    ...style,
    onChange,
    getColor,
  };
};
