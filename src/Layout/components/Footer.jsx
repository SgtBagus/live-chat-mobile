import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FooterComponents = ({ currentPath }) => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
      return navigate(path);
    };

    const MENU_LIST = [
        {
            id: 1,
            title: 'Home',
            iconMenu: 'ri-home-5-line',
            path: '/',
            onClick: () => handelNavigate('/'),
        },
        {
            id: 2,
            title: 'List Kegiatan',
            iconMenu: 'ri-list-ordered',
            path: '/to-do',
            onClick: () => handelNavigate('/to-do'),
        },
        {
            id: 3,
            title: 'Konsultasi',
            iconMenu: 'ri-chat-1-fill',
            path: '/chat',
            onClick: () => handelNavigate('/chat'),
        },
        {
            id: 4,
            title: 'Account',
            iconMenu: 'ri-user-3-line',
            path: '/account',
            onClick: () => handelNavigate('/account'),
        },
    ];

    return (
        <div className="mobile-style-1">
            <ul>
                {
                    MENU_LIST.map(({
                        id, title, iconMenu, path, onClick,
                    }) => (
                        <li className={`${currentPath === path && "active"}`} key={id}>
                            <div
                                className="mobile-box"
                                onClick={onClick}
                            >
                                <div className="mobile-icon">
                                    <i className={iconMenu} />
                                </div>
                                <div className="mobile-name">
                                    <h5>{title}</h5>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}