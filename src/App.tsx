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
      <Context.Consumer>
        {({ loading }) => {
          if (loading) {
            return <Fragment />;
          }
          return (
            <Fragment>
              <ThemeStyle />
              <AuthProvider>
                <BrowserRouter>
                  <HtmlProvider>
                    <App />
                  </HtmlProvider>
                </BrowserRouter>
              </AuthProvider>
            </Fragment>
          );
        }}
      </Context.Consumer>
    </ThemeProvider>
  );
}
export default MainApp;
