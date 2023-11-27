import React, { useContext } from "react";

import { HeaderComponents } from './components/Header';
import { FooterComponents } from './components/Footer';

import EmailVerification from './components/EmailVerification';

import { AuthContext } from "../context/AuthContext";

export const LayoutDefault = ({ children, path }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <HeaderComponents />
                {
                    (currentUser && !currentUser.emailVerified) && (
                        <EmailVerification currentUser={currentUser} />
                    )
                }
                {children}
                
                <div style={{ height: '100px' }}/>
            <FooterComponents currentPath={path} />
        </>
    )
}