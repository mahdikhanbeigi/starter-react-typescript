import { BrowserRouter } from "react-router-dom";
import App from "@app/containers/App";
import { ThemeProvider } from "@starter-frontend/theme";
import { GlobalProvider } from "@app/hook/global";
import { AuthProvider } from "@app/hook/auth";
import { ThemeConsumer } from "styled-components";
import { ThemeStyle } from "@app/containers/ThemeStyle";

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
