import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DEFAULT_IMAGE_MOBILE } from "../../Components/DefaultValue/config";

import { LoadingContext } from "../../context/LoadingContext";


const AuthLogin = () => {
    const { dispatchLoading } = useContext(LoadingContext);

    useEffect(() => {
        dispatchLoading(false);
    });

    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    };

    return (
        <>
            <div className="ecommerce-bg-image-onboarding">
                <img src={DEFAULT_IMAGE_MOBILE} className="img-fluid" alt="Auth Index Home" />
            </div>
            <div className="onboarding-button ecommerce-button">
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
