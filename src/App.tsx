import { BrowserRouter } from "react-router-dom";
import App from "containers/App";
import { ThemeProvider } from "@starter-frontend/theme";
import { GlobalProvider } from "hook/global";
import { AuthProvider } from "hook/auth";
import { ThemeConsumer } from "styled-components";
import { ThemeStyle } from "containers/ThemeStyle";

function MainApp() {
  return (
    <ThemeProvider
    defaultStyle={{
      name: "light",
    }}
    >
      <ThemeStyle />
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

