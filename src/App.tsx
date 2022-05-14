import { BrowserRouter } from "react-router-dom";
import App from "containers/App";
import { ThemeProvider, IDictionary } from "@starter-frontend/theme";
import { GlobalProvider } from "hook/global";
import { AuthProvider } from "hook/auth";
import { createGlobalStyle, ThemeConsumer } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${(props) => props.theme.style.getColor("text")};
    background-color: ${(props) => props.theme.style.getColor("grey")};
    font-family : ${(props) =>
      props.theme.lang.dictionary["theme.locale"] === "fa-IR"
        ? "iransans"
        : "Open Sans"};
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
    if (props.theme.lang.dictionary["theme.dir"] === "ltr") {
      return `
        .text-start{
          text-align : left
        }
        .text-end{
          text-align : right
        }
      `;
    } else {
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
  @media (min-width: 768px) {
    .container {
      max-width: 540px !important;
    }
  }
`;
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
function MainApp() {
  return (
    <ThemeProvider
      defaultStyle={{
        name: "light",
      }}
      callback={dictionaryChange}
    >
      <GlobalStyle />
      <AuthProvider>
        <ThemeConsumer>
          {({ lang }) => (
            <GlobalProvider dictionary={lang["dictionary"]}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </GlobalProvider>
          )}
        </ThemeConsumer>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MainApp;
