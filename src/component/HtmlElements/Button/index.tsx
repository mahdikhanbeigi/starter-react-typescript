import styled from "styled-components";
import { IThemeColor } from "typings/theme";

type IProps = {
  $textColor?: Partial<IThemeColor>;
  $bgColor?: Partial<IThemeColor>;
  $borderColor?: Partial<IThemeColor>;
  $isLink?: boolean;
  $isCircle?: boolean;
  $isIcon?: boolean;
  $isBlock?: boolean;
  $isActive?: boolean;
  $isDisabled?: boolean;
  $sizing?: "sm" | "lg";
};
const Button = styled.button.attrs((props) => {
  if (!("as" in props)) {
    return {
      type: props.type ? props.type : "button",
    };
  }
})<IProps>`
  padding: ${(props) =>
    !props.$isLink && !props.$isIcon
      ? props.theme.style.sizing.btn.padding + ";"
      : "0;"};
  ${(props) => {
    let style = "";
    if (props.$isBlock) {
      style += `
                width : 100%;
                display : block;
            `;
    }
    if (props.$isIcon) {
      style += `
                display:flex;
                align-items:center;
                justify-content:center;
            `;
      if (props.$sizing === "lg")
        style += `
            width:${props.theme.style.sizing.btn.squareLg};
            height:${props.theme.style.sizing.btn.squareLg};
            `;
      else if (props.$sizing === "sm")
        style += `
                width:${props.theme.style.sizing.btn.squareSm};
                height:${props.theme.style.sizing.btn.squareSm};
            `;
      else
        style += `
                width:${props.theme.style.sizing.btn.square};
                height:${props.theme.style.sizing.btn.square};
            `;
      if (props.$sizing === "lg")
        style += `
                font-size: ${props.theme.style.sizing.fontSizeLg};
            `;
      else if (props.$sizing === "sm")
        style += `
                font-size: ${props.theme.style.sizing.fontSizeSm};
            `;
      else
        style += `
                font-size: ${props.theme.style.sizing.fontSize};
            `;
    }
    return style;
  }}
  border-width: 1px;
  border-style: solid;
  user-select: none;
  border-radius: ${(props) =>
    props.$isCircle ? "50%" : props.theme.style.sizing.radius + "rem"};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  min-height: ${(props) => props.theme.style.sizing.btn.square};
  ${(props) =>
    props.$isLink
      ? `
    text-decoration: underline;
    `
      : ""}

  ${(props) => {
    const text = props.$textColor?.name;
    const bg = props.$bgColor?.name;
    const hoverText = props.$textColor?.hover || text;
    const hoverBg = props.$bgColor?.hover || bg;
    const activeText = props.$textColor?.active || hoverText || text;
    const activeBg = props.$bgColor?.active || hoverBg || bg;
    const border = props.$borderColor || props.$bgColor || undefined;
    const hoverBorder = props.$borderColor?.hover || border?.name;
    const activeBorder = props.$borderColor?.active || hoverBorder;
    return `
        ${
          props.$isDisabled
            ? `
        color : ${props.theme.style.getColor("txt", "lighter")};
        background-color : ${props.theme.style.getColor("grey")};
        border-color : ${props.theme.style.getColor("grey", "darker")};
        `
            : `
        &:disabled{
            color : ${props.theme.style.getColor("txt", "lighter")};
            background-color : ${props.theme.style.getColor("grey")};
            border-color : ${props.theme.style.getColor("grey", "darker")};
        }
        &:not(:disabled){
            color : ${
              props.$textColor
                ? props.theme.style.getColor(
                    text,
                    props.$textColor.mood,
                    props.$textColor.opacity
                  )
                : props.theme.style.getColor("text")
            };
            background-color : ${
              props.$bgColor
                ? props.theme.style.getColor(
                    bg,
                    props.$bgColor.mood,
                    props.$bgColor.opacity
                  )
                : "transparent"
            };
            border-color : ${
              border
                ? props.theme.style.getColor(
                    border.name,
                    border.mood || "darker",
                    border.opacity
                  )
                : "transparent"
            };
        }
        &:not(:disabled):hover{
            ${
              hoverText
                ? `color : ${props.theme.style.getColor(
                    hoverText,
                    "darker",
                    props.$textColor?.opacity
                  )};`
                : ""
            };
            ${
              hoverBg
                ? `background-color : ${props.theme.style.getColor(
                    hoverBg,
                    "darker",
                    1
                  )};`
                : ""
            }
            ${
              hoverBorder
                ? `border-color : ${props.theme.style.getColor(
                    hoverBorder,
                    "darker",
                    border?.opacity
                  )};`
                : ""
            };
        }
        ${
          props.$isActive &&
          `
        ${
          activeText
            ? `
        color : ${props.theme.style.getColor(
          activeText,
          "darkest",
          props.$textColor?.opacity
        )};
    `
            : ""
        };
    ${
      activeBg
        ? `
    background-color : ${props.theme.style.getColor(activeBg, "darkest", 1)};
    `
        : ""
    }
    ${
      activeBorder
        ? `
    border-color : ${props.theme.style.getColor(
      activeBorder,
      "darkest",
      border?.opacity
    )};
`
        : ""
    };
    }`
        }
    &:not(:disabled):active,&:not(:disabled):focus,&.active{
        ${
          activeText
            ? `
            color : ${props.theme.style.getColor(
              activeText,
              "darkest",
              props.$textColor?.opacity
            )};
        `
            : ""
        };
        ${
          activeBg
            ? `
        background-color : ${props.theme.style.getColor(
          activeBg,
          "darkest",
          1
        )};
        `
            : ""
        }
        ${
          activeBorder
            ? `
        border-color : ${props.theme.style.getColor(
          activeBorder,
          "darkest",
          border?.opacity
        )};
    `
            : ""
        };
    }
        `
        }
        `;
  }}
`;

export default Button;
