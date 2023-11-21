import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { LayoutDefault } from "../Layout"; 

import Login from "../Pages/Auth/Login";

import Home from "../Pages/Home";

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

      <Route path="login" element={<Login />}/>
    </Routes>
  );
}

export default RoutesComponents;
