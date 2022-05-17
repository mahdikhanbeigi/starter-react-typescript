import { Fragment } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "@app/containers/panel/Header";
import Footer from "@app/containers/panel/Footer";
import Home from "./Home";
import ErrorRoute from "@app/routes/error";
const PrivateRoute = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route
          element={
            <Fragment>
              <Header />
              <Outlet />
              <Footer />
            </Fragment>
          }
        >
          <Route index element={<Home />} />
          <Route path="*" element={<ErrorRoute />} />
        </Route>
      </Routes>
    </div>
  );
};

export default PrivateRoute;
