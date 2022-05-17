import { Fragment } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "@app/containers/Main/Header";
import Footer from "@app/containers/Main/Footer";
import Home from "./Home";
import ErrorRoute from "@app/routes/error";
const MainRoute = () => {
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

export default MainRoute;
