import { BrowserRouter } from "react-router-dom";
import App from "@app/containers/App";
import { ThemeProvider } from "@starter-frontend/theme";
import { AuthProvider } from "@app/hook/auth";
import { ThemeStyle } from "@app/containers/ThemeStyle";
import { HtmlProvider, Context } from "@starter-frontend/html-elements";
import { Fragment } from "react";

function MainApp() {
  return (
    <ThemeProvider
      prefix="app"
      defaultStyle={{
        name: "light",
      }}
    >
      <ThemeStyle />
      <AuthProvider>
        <BrowserRouter>
          <HtmlProvider>
            <Context.Consumer>
              {({ loading }) => {
                if (loading) {
                  return <Fragment />;
                }
                return <App />;
              }}
            </Context.Consumer>
          </HtmlProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MainApp;
