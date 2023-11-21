import React from 'react';

export const FooterComponents = () => {
    return (
        <div className="mobile-style-1">
            <ul>
                <li className="active">
                    <a href="#!" className="mobile-box">
                        <div className="mobile-icon">
                            <i className="ri-home-5-line" />
                        </div>
                        <div className="mobile-name">
                            <h5>Home</h5>
                        </div>
                    </a>
                </li>

                <li>
                    <a href="#!" className="mobile-box">
                        <div className="mobile-icon">
                            <i className="ri-list-ordered" />
                        </div>
                        <div className="mobile-name">
                            <h5>List Kegiatan</h5>
                        </div>
                    </a>
                </li>

                <li>
                    <a href="#!" className="mobile-box">
                        <div className="mobile-icon">
                            <i className="ri-chat-1-fill" />
                        </div>
                        <div className="mobile-name">
                            <h5>Konsultasi</h5>
                        </div>
                    </a>
                </li>

                <li>
                    <a href="#!" className="mobile-box">
                        <div className="mobile-icon">
                            <i className="ri-time-line"></i>
                        </div>
                        <div className="mobile-name">
                            <h5>Riwayat</h5>
                        </div>
                    </a>
                </li>

                <li>
                    <a href="#!" className="mobile-box">
                        <div className="mobile-icon">
                            <i className="ri-user-3-line"></i>
                        </div>
                        <div className="mobile-name">
                            <h5>Account</h5>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}