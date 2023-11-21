import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { LayoutDefault } from "../Layout"; 

import Home from "../Pages/Home";

// import { NotFound404 } from "../Layout/404";
import { AuthContext } from "../context/AuthContext";


const RenderDefaultLayout = (pageComponents, pageName, path) => (
  <LayoutDefault
    pageName={pageName}
    path={path}
  >
    {pageComponents}
  </LayoutDefault>
)

const RoutesComponents = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {

    if (!isLoading) {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
    }

    return children;
  };

  const HasRoute = ({ children }) => {
    if (!isLoading) {
      if (currentUser) {
        return <Navigate to="/" />;
      }
    }

    return children;
  };

  return (
    <Routes>
      <Route path="" element={RenderDefaultLayout(<Home dataLogin={currentUser} />, "Home", "/" )}/>

      {/* <Route path="*" element={<NotFound404 />} /> */}
    </Routes>
  );
}

export default RoutesComponents;
