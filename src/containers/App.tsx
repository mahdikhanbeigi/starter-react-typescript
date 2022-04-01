import { Fragment } from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import MainRoute from "routes/main";
import PrivateRoute from "routes/private";
import LoginRoute from "routes/sign/Login";
import RegisterRoute from "routes/sign/Register";
import { Button } from "component/HtmlElements";
import useTheme from "theme/use-theme";
import Modal from "component/Modal";
import { useAuth } from "hook/auth";

interface IRequireAuth {
  isLogin: boolean;
  children: JSX.Element;
}
const RequireAuth = ({ isLogin, children }: IRequireAuth) => {
  const location = useLocation();
  if (!isLogin) {
    return (
      <Navigate to={process.env.REACT_APP_BASE_URL + "/login"} state={{ from: location }} replace />
    );
  }

  return children;
};
export const App = () => {
  const { user,onLogin,onLogout } = useAuth();
  const { lang, style } = useTheme();
 
    

  const _onToggleColor = () => {
    style.onChange(style.name === "light" ? "dark" : "light");
  };

  const _onToggleLang = () => {
    lang.onChange(
      lang.dictionary["theme.locale"] === "en-US" ? "fa-IR" : "en-US"
    );
  };
  return (
    <Fragment>
      <Routes>
        <Route path={process.env.REACT_APP_BASE_URL + "/"} element={<MainRoute />} />
        <Route
          path={process.env.REACT_APP_BASE_URL + "/private"}
          element={
            <RequireAuth isLogin={!!user}>
              <PrivateRoute />
            </RequireAuth>
          }
        />
        <Route path={process.env.REACT_APP_BASE_URL + "/login"} element={<LoginRoute />} />
        <Route path={process.env.REACT_APP_BASE_URL + "/register"} element={<RegisterRoute />} />
      </Routes>
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap">
          <Button
            as={Link}
            $bgColor={{
              name: "green",
            }}
            $textColor={{
              name: "white",
            }}
            className="me-1"
            to={process.env.REACT_APP_BASE_URL + "/"}
          >
            {lang.dictionary["nav.title.home"]}
          </Button>
          <Button
            as={Link}
            $bgColor={{
              name: "green",
            }}
            $textColor={{
              name: "white",
            }}
            className="me-3"
            to={process.env.REACT_APP_BASE_URL + "/private"}
          >
            {lang.dictionary["nav.title.pagePrivate"]}
          </Button>
          <Button
            $bgColor={{
              name: "green",
            }}
            $textColor={{
              name: "white",
            }}
            className="me-1"
            onClick={_onToggleLang}
          >
            {lang.dictionary["theme.locale"]}
          </Button>
          <Button
            $bgColor={{
              name: !user ? "green" : "red",
            }}
            $textColor={{
              name: "white",
            }}
            className="me-1"
            onClick={!user ? ()=> onLogin("test","test") : onLogout}
          >
            {!user ? lang.dictionary["login"] : lang.dictionary["logout"]}
          </Button>
          <Button
            $bgColor={{
              name: style.name === "dark" ? "light" : "dark",
            }}
            $textColor={{
              name: style.name !== "dark" ? "light" : "dark",
            }}
            onClick={_onToggleColor}
          >
            {style.name}
          </Button>
        </div>
      </div>
      <Modal />
    </Fragment>
  );
};

export default App;
