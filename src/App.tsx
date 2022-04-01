import { BrowserRouter } from "react-router-dom";
import App from "containers/App";
import ThemeProvider from "theme/Provider";
import GlobalProvider from "hook/global/Provider";
import AuthProvider from "hook/auth/Provider";
import { ThemeConsumer } from "styled-components";

function MainApp() {
  return (
    <ThemeProvider>
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
