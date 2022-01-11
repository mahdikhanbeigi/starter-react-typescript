import { Fragment, useState } from "react";
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import ErrorRoute from "routes/error";
import MainRoute from "routes/main";
import PrivateRoute from "routes/private";
import LoginRoute from "routes/sign/Login";
import RegisterRoute from "routes/sign/Register";
import { Button } from "component/HtmlElements";
import useTheme from "theme/use-theme";

const BASE_URL = "";
interface IRequireAuth {
    isLogin: boolean;
    children: JSX.Element;
}
const RequireAuth = ({ isLogin, children }: IRequireAuth) => {
    const location = useLocation();
    if (!isLogin) {
        return <Navigate to={BASE_URL+"/login"} state={{ from: location }} replace />;
    }

    return children;
}
export const App = () => {
    const { lang, style } = useTheme();
    const [isLogin, setLogin] = useState<boolean>(false);
    const _onToggleAuth = () => {
        setLogin(prev => !prev)
    }
    const _onToggleColor = () => {
        style.onChange(style.name === "light" ? "dark" : "light")
    }

    const _onToggleLang = () => {
        lang.onChange(lang.dictionary['theme.locale'] === "en-US" ? "fa-IR" : "en-US")
    }
    return (
        <Fragment>
            <Routes>
                <Route path={BASE_URL+"/"} element={<MainRoute />} />
                <Route path={BASE_URL+'/private'} element={
                    <RequireAuth isLogin={isLogin}>
                        <PrivateRoute />
                    </RequireAuth>
                } />
                <Route path={BASE_URL+'/login'} element={<LoginRoute />} />
                <Route path={BASE_URL+'/register'} element={<RegisterRoute />} />
                <Route path="*" element={<ErrorRoute />} />
            </Routes>
            <div className="container mt-5">
                <Button as={Link} color={"white"} className="ms-2" to={BASE_URL+"/private"}>
                    page private
                </Button>
                <Button bgColor="green" color={"white"} className="ms-2" onClick={_onToggleLang}>
                    {lang.dictionary['theme.locale']}
                </Button>
                <Button bgColor="primary" color={"white"} onClick={_onToggleColor}>
                    {style.name}
                </Button>
                <Button bgColor="green" color={"white"} className="ms-2" onClick={_onToggleAuth}>
                    {lang.dictionary['toggleAuth']} : {String(isLogin)}
                </Button>
            </div>
        </Fragment>
    )
}


export default App;