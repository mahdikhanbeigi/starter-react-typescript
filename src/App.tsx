import { BrowserRouter } from "react-router-dom";
import App from "@app/containers/App";
import { ThemeProvider } from "@starter-frontend/theme";
import { AuthProvider } from "@app/hook/auth";
import { ThemeConsumer } from "styled-components";
import { ThemeStyle } from "@app/containers/ThemeStyle";
import { HtmlProvider, Modal, Overlay } from "@starter-frontend/html-elements";

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
        <HtmlProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Modal
            style={{
              content: {
                background: "red",
                maxWidth: "500px",
              },
            }}
          />
          <Overlay />
        </HtmlProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MainApp;
