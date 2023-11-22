import React from 'react';

import { HeaderComponents } from './components/Header';
import { FooterComponents } from './components/Footer';

export const LayoutDefault = ({ children, pageName, path }) => (
    <>
        <div className="min-loader-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/2560px-Service_mark.svg.png" className="img-fluid loader" alt="" />
            <div className="loader-section ecommerce-color section-left"></div>
            <div className="loader-section ecommerce-color section-right"></div>
        </div>

        <HeaderComponents />
            {children}
            
            <div style={{ height: '100px' }}/>
        <FooterComponents currentPath={path} />
    </>
)