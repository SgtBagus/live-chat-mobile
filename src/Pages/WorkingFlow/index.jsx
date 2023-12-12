import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../Components/Container";
import Button from "../../Components/Button";

import ModalsWorkingList from "./Components/Modals";

import { LoadingContext } from "../../context/LoadingContext";
import { AuthContext } from "../../context/AuthContext";

import './style.scss';

const WorkingFlow = () => {
    const navigate = useNavigate();

    const { currentUser: { uid } } = useContext(AuthContext) || { currentUser: { uid: null } };
    const { dispatchLoading } = useContext(LoadingContext);

    useEffect(() => {
        return () => {
            if (uid) {
                dispatchLoading(false);
            } else {
                dispatchLoading(true);
            }
        };
    }, [dispatchLoading, uid]);

    
    const handelbuttonChat = () => {
        return navigate("/chat");
    }

    return (
        <>
            <Container className="home-section pb-3">
                <div className="home-box">
                    <img
                        src="https://a.storyblok.com/f/178900/640x360/4e388f11a0/8ca08c706af33131e5606513919e01941669178926_main.png/m/filters:quality(95)format(webp)"
                        className="img-fluid"
                        alt="Banner Images"
                    />
                    <div className="home-container">
                        <div>
                            <h4>Belum ada Kegiatan ! <br /> Konsultasi Terlebih Dahulu !</h4>
                            <Button
                                className="w-75 explore-btn"
                                label="Chat Sekarang !"
                                onClick={handelbuttonChat}
                            />
                        </div>
                    </div>
                </div>
            </Container>
            
            <Container
                className="ecommerce-address-section"
            >
                <ul className="address-list">
                    <li className="active">
                        <ModalsWorkingList
                            target='to-do-list-1'
                            modalHeight="800px"
                            modalTitle="Trapi Sakit Lambung !"
                        />
                    </li>
                </ul>
            </Container>
        </>
    );
};

export default WorkingFlow;
