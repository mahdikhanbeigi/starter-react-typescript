import { Fragment } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from "containers/Main/Header";
import Footer from "containers/Main/Footer";
import Home from "./Home";
import ErrorRoute from "routes/error";
const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Fragment>
                    <Header />
                    <Outlet />
                    <Footer />
                </Fragment>
            }>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<ErrorRoute />} />
            </Route>
        </Routes>
    )
}

export default MainRoute;