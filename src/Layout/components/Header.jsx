import React from 'react';

export const HeaderComponents = () => {
    return (
        <header className="header-style-5">
            <div className="header-left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/2560px-Service_mark.svg.png"
                    className="img-fluid" alt=""
                    style={{
                        width: '100px',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className="header-right">
                <a href="notification.html">
                    <i className="ri-notification-2-line"></i>
                </a>
            </div>
        </header>
    )
}