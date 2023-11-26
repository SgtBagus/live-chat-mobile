import React, { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';

import Routes from './Routes/Routes';

import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";

import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <StrictMode>
          <HashRouter>
            <Routes />

            <NotificationContainer />
          </HashRouter>
        </StrictMode>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
