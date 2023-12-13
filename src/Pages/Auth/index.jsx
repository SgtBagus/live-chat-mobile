import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DEFAULT_IMAGE_MOBILE } from "../../Components/DefaultValue/config";

import { LoadingContext } from "../../context/LoadingContext";
import { AuthContext } from "../../context/AuthContext";


const AuthLogin = () => {
    const { dispatchLoading } = useContext(LoadingContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        dispatchLoading(true);

        if (!currentUser) {
          dispatchLoading(false);
        }
    }, [currentUser, dispatchLoading]);

    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    };

    return (
        <>
            <div
                className="onboarding-button"
                style={{
                    backgroundColor: 'unset',
                    position: 'unset',
                }}
            >
                <div
                    className="onboarding-button-group"
                    style={{
                        top: '20px',
                        bottom: 'unset',
                        backgroundColor: 'unset',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Blue_Archive_EN_logo.svg/2560px-Blue_Archive_EN_logo.svg.png"
                        className="img-fluid text-center"
                        alt=""
                        style={{
                            width: '300px',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
            <div className="ecommerce-bg-image-onboarding">
                <img src={DEFAULT_IMAGE_MOBILE} className="img-fluid" alt="Auth Index Home" />
            </div>
            <div
                className="onboarding-button ecommerce-button"
                style={{
                    backgroundColor: 'unset',
                    position: 'unset',
                }}
            >
                <div className="onboarding-button-group">
                    <div
                        className="btn btn-white title-color"
                        onClick={() => handelNavigate('/login')}
                    >
                        Login
                    </div>
                    <div 
                        className="btn ecommerce-btn ecommerce-btn-border"
                        onClick={() => handelNavigate('/register')}
                    >
                        Daftar
                    </div>
                    <p>Dengan Menekan Tombol Login atau Daftar, Anda dapat menggunakan Aplikasi ini !</p>
                </div>
            </div>
        </>
    );
};

export default AuthLogin;
