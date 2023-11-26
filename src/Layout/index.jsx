import React from 'react';

import { HeaderComponents } from './components/Header';
import { FooterComponents } from './components/Footer';

export const LayoutDefault = ({ children, pageName, path }) => (
    <>
        <HeaderComponents />
            {children}
            
            <div style={{ height: '100px' }}/>
        <FooterComponents currentPath={path} />
    </>
)