import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import useStyle from "./use-style";
import useLang from "./use-lang";
import { IUseLang, IUseStyle } from "typings/theme";


declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface { }
}

type IProviderProps = {
    children: React.ReactNode;
}
export interface ThemeInterface {
    style: IUseStyle,
    lang: IUseLang;
}


const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.style.getColor('text')};
    background-color: ${props => props.theme.style.getColor('grey')};
    font-family : ${props => props.theme.lang.dictionary['theme.locale'] === "fa-IR" ? "iransans" : "Open Sans"};
  }
  html,body,#root,.h-100{
    height:100%;
  }
  a {
    text-decoration: none;
  }
  .w-100{
    width:100%;
  }
  label{
    color : ${props => props.theme.style.getColor('txt')};
    margin-bottom: 5px;
    font-size: .9rem;
  }
  .text-center{
    text-align: center;
  }
  .overflow-auto{
    overflow: auto;
  }
  .white-space-nowrap{
    white-space: nowrap;
  }
  ${props=>{
    if(props.theme.lang.dictionary["theme.dir"] === "ltr"){
      return `
        .text-start{
          text-align : left
        }
        .text-end{
          text-align : right
        }
      `
    }else{
      return `
      .fa-angle-right:before {
        content: "\f104";
      }
      .fa-angle-left:before {
        content: "\f105";
      }
      .fa-arrow-left:before {
        content: "\f061";
      }
    .fa-arrow-right:before {
      content: "\f060";
    }
        .text-start{
          text-align : right
        }
        .text-end{
          text-align : left
        }
      `
    }
  }}
  @media (min-width: 768px) {
    .container {
      max-width: 540px !important;
    }
  }
`
const CustomThemeProvider = ({ children }: IProviderProps) => {
    const style = useStyle();
    const lang = useLang();
    return (
        <ThemeProvider theme={{
            style,
            lang
        }}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}
export default CustomThemeProvider;