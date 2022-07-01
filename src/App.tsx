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
          <ThemeConsumer>
            {({ style }) => (
              <Modal
                style={{
                  content: {
                    backgroundColor: style.getColor("light"),
                    border: "1px solid " + style.getColor("light", 2),
                    maxWidth: "500px",
                    borderRadius: style.sizing?.["border-radius"] || "4px",
                  },
                }}
              />
            )}
          </ThemeConsumer>
          <Overlay />
        </HtmlProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MainApp;
