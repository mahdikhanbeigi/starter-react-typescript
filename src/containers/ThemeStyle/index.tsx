import { Fragment, useEffect, useState } from "react";
import { IDictionary, useTheme } from "@starter-frontend/theme";
import { createGlobalStyle } from "styled-components";

const createLinkCss = (id: string, href: string) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  head.appendChild(link);
};
const dictionaryChange = (data: IDictionary) => {
  document.documentElement.lang = data["theme.locale"];
  document.documentElement.dir = data["theme.dir"];
  const rtlPathname = data["theme.dir"] === "rtl" ? ".rtl" : "";
  const bootstrapReboot = document.querySelector('link[id="bootstrapReboot"]');
  const bootstrapRebootPathname =
    "/assets/css/bootstrap-reboot" + rtlPathname + ".min.css";
  const bootstrapGrid = document.querySelector('link[id="bootstrapGrid"]');
  const bootstrapGridPathname =
    "/assets/css/bootstrap-grid" + rtlPathname + ".min.css";

  const iransansPathname = "/assets/css/iransans.css";
  const robotoPathname =
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap";
  const fontFamily = document.querySelector('link[id="fontFamily"]');
  const fontFamilyPathname =
    data["theme.locale"] === "fa-IR" ? iransansPathname : robotoPathname;

  if (bootstrapReboot && bootstrapGrid && fontFamily) {
    bootstrapReboot.setAttribute("href", bootstrapRebootPathname);
    bootstrapGrid.setAttribute("href", bootstrapGridPathname);
    fontFamily.setAttribute("href", fontFamilyPathname);
  } else {
    createLinkCss("bootstrapReboot", bootstrapRebootPathname);
    createLinkCss("bootstrapGrid", bootstrapGridPathname);
    createLinkCss("fontFamily", fontFamilyPathname);
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${(props) => props.theme.style.getColor("text")};
    background-color: ${(props) => props.theme.style.getColor("light")};
    font-family : ${(props) =>
      props.theme.lang.dictionary["theme.locale"] === "fa-IR"
        ? "iransans"
        : "Open Sans"};
  }
  html,body,#root,.h-100{
    height:100%;
  }
  a {
    transition: all .2s ease-in-out;
    text-decoration:none;
  }
  .w-100{
    width:100%;
  }
  label{
    color : ${(props) => props.theme.style.getColor("txt")};
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
  ${(props) => {
    if (props.theme.lang.dictionary["theme.dir"] === "rtl") {
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
      `;
    }
  }}
`;

export const ThemeStyle = () => {
  const { lang } = useTheme();
  const { dictionary } = lang;
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    dictionaryChange(dictionary);
    setLoading(false)
  }, [dictionary]);

  return loading ? <Fragment /> : <GlobalStyle />;
};
