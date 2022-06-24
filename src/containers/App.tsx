import { Fragment } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  Link,
} from "react-router-dom";
import MainRoute from "@app/routes/main";
import PrivateRoute from "@app/routes/private";
import LoginRoute from "@app/routes/sign/Login";
import RegisterRoute from "@app/routes/sign/Register";
import { useGlobalAuth } from "@app/hook/auth";
import { useTheme } from "@starter-frontend/theme";
import { Button } from "@starter-frontend/html-elements";

interface IRequireAuth {
  isLogin: boolean;
  children: JSX.Element;
}
const RequireAuth = ({ isLogin, children }: IRequireAuth) => {
  const location = useLocation();
  if (!isLogin) {
    return (
      <Navigate
        to={process.env.REACT_APP_BASE_URL + "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};
export const App = () => {
  const { user, onLogin, onLogout } = useGlobalAuth();
  const { lang, style } = useTheme();

  const _onToggleColor = () => {
    style.onChange(style.name === "light" ? "dark" : "light");
  };
  const _onToggleLang = () => {
    lang.onChange(
      lang.dictionary["theme.locale"] === "en-US" ? "fa-IR" : "en-US",
    );
  };
  return (
    <Fragment>
      <Routes>
        <Route
          path={process.env.REACT_APP_BASE_URL + "/*"}
          element={<Outlet />}
        >
          <Route path="*" element={<MainRoute />} />
          <Route
            path="private/*"
            element={
              <RequireAuth isLogin={!!user}>
                <PrivateRoute />
              </RequireAuth>
            }
          />
          <Route path={"login"} element={<LoginRoute />} />
          <Route path={"register"} element={<RegisterRoute />} />
        </Route>
      </Routes>
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap">
          <Button
            as={Link}
            // $bgColor={{
            //   variant: {
            //     name: "green",
            //   },
            // }}
            // $textColor={{
            //   variant: {
            //     name: "white",
            //   },
            // }}
            className="me-1"
            to={process.env.REACT_APP_BASE_URL + "/"}
          >
            {lang.dictionary["nav.title.home"]}
          </Button>
          <Button
            as={Link}
            $bgColor={{
              variant: {
                name: "green",
              },
            }}
            $textColor={{
              variant: {
                name: "white",
              },
            }}
            className="me-3"
            to={process.env.REACT_APP_BASE_URL + "/private"}
          >
            {lang.dictionary["nav.title.pagePrivate"]}
          </Button>
          <Button
            $bgColor={{
              variant: {
                name: "green",
              },
            }}
            $textColor={{
              variant: {
                name: "white",
              },
            }}
            className="me-1"
            onClick={_onToggleLang}
          >
            {lang.dictionary["theme.locale"]}
          </Button>
          <Button
            $bgColor={{
              variant: {
                name: !user ? "green" : "red",
              },
            }}
            $textColor={{
              variant: {
                name: "white",
              },
            }}
            className="me-1"
            onClick={!user ? () => onLogin("test", "test") : onLogout}
          >
            {!user ? lang.dictionary["login"] : lang.dictionary["logout"]}
          </Button>
          <Button
            $bgColor={{
              variant: {
                name: "dark",
              },
            }}
            $textColor={{
              variant: {
                name: "light",
              },
            }}
            onClick={_onToggleColor}
          >
            {style.name}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
