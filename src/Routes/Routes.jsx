import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { LayoutDefault } from "../Layout"; 

import AuthLogin from "../Pages/Auth/";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgetPassword from  "../Pages/Auth/ForgetPassword";

import Page404 from "../Layout/Page404";

import Home from "../Pages/Home";
import Account from "../Pages/Account";
import Chat from "../Pages/Chat";


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
        return <Navigate to="/AuthLogin" />;
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
      <Route
        path=""
        element={
          <ProtectedRoute>
            {RenderDefaultLayout(<Home />, "Home", "/" )}
          </ProtectedRoute>
        }
      />
      <Route
        path="account"
        element={
          <ProtectedRoute>
            {RenderDefaultLayout(<Account />, "Profil", "/account" )}
          </ProtectedRoute>
        }
      />
      <Route
        path="chat"
        element={
          <ProtectedRoute>
            {RenderDefaultLayout(<Chat />, "Chat", "/chat" )}
          </ProtectedRoute>
        }
      />



      <Route path="*" element={<Page404 />} />



      <Route
        path="AuthLogin"
        element={
        <HasRoute>
          <AuthLogin />
        </HasRoute>
        }
      />
      <Route
        path="login"
        element={
          <HasRoute>
            <Login />
          </HasRoute>
        }
      />
      <Route
        path="register"
        element={
          <HasRoute>
            <Register />
          </HasRoute>
        }
      />
      <Route
        path="forget-password"
        element={
          <HasRoute>
            <ForgetPassword />
          </HasRoute>
        }
      />
    </Routes>
  );
}

export default RoutesComponents;
