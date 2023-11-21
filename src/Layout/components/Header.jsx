import React from 'react';

export const HeaderComponents = ({ dataLogin }) => {
    return (
        <header className="header-style-5">
            <div className="header-left">
                <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
                    <i className="ri-bar-chart-horizontal-line"></i>
                </button>
                <a href="index.html">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/2560px-Service_mark.svg.png"
                        className="img-fluid" alt=""
                        style={{
                            width: '100px',
                            objectFit: 'cover',
                        }}
                    />
                </a>
            </div>
            <div className="header-right">
                <a href="notification.html">
                    <i className="ri-notification-2-line"></i>
                </a>
                <a href="wishlist.html">
                    <i className="ri-heart-3-line"></i>
                </a>
                <a href="cart.html">
                    <i className="ri-shopping-cart-line"></i>
                </a>
            </div>
        </header>
    )
}