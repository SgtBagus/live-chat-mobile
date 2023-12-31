import React from "react";

import { BrowserRouter } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';

import Routes from './Routes/Routes';

import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";

import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <BrowserRouter basename="/">
          <Routes />

          <NotificationContainer />
        </BrowserRouter>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
