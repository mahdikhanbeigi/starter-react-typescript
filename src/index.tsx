import { initialProps } from "@starter-frontend/html-elements";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

initialProps.style = {
  btn: {
    $bgColor: {
      active: {
        name: "red",
      },
    },
  },
  overlayBg: {
    name: "dark",
    mood: 1,
    opacity: 0.5,
  },
  dropdownMenu: {
    $style: {
      $bgColor: {
        variant: {
          name: "light",
        },
      },
    },
  },
  card: {
    $bgColor: {
      name: "yellow",
    },
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
