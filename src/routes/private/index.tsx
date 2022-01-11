import { Fragment } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from "containers/panel/Header";
import Footer from "containers/panel/Footer";
import Home from "./Home";
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
            </Route>
        </Routes>
    )
}

export default MainRoute;