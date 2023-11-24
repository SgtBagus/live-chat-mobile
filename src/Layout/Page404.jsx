import React from "react";
import { useNavigate } from 'react-router-dom';

import Container from "../Components/Container";
import Button from "../Components/Button";

const Page404 = () => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
      return navigate(path);
    };

    return (
        <>
            <Container className="home-section my-3">
                <div className="home-box">
                <img
                    src="https://i.pinimg.com/736x/c2/ae/9e/c2ae9e92215afbd25a8173a02adab7f4.jpg"
                    className="img-fluid"
                    alt="Banner Images"
                />
                <div className="home-container">
                    <div>
                        <h1 className="text-white">404 </h1>
                        <h4>Halaman ini tidak di temukan</h4>
                        <Button
                            className="w-75 explore-btn"
                            label="Halaman Utama"
                            onClick={() => {
                                handelNavigate("/");
                            }}
                        />
                    </div>
                </div>
                </div>
            </Container>
        </>
    );
};

export default Page404;