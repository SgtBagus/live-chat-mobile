import React from 'react';

import { HeaderComponents } from './components/Header';
import { FooterComponents } from './components/Footer';

export const LayoutDefault = ({ dataLogin, children, pageName }) => (
    <>
        <HeaderComponents dataLogin={dataLogin} />
            
            <div className="min-loader-wrapper">
                <img src="../assets/images/favicon/2.svg" className="img-fluid loader" alt="" />
                <div className="loader-section ecommerce-color section-left"></div>
                <div className="loader-section ecommerce-color section-right"></div>
            </div>

            {children}
        <FooterComponents />
    </>
)