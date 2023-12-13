import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../Components/Container";
import Button from "../../Components/Button";

import ModalsWorkingList from "./Components/Modals";

import { LoadingContext } from "../../context/LoadingContext";
import { AuthContext } from "../../context/AuthContext";

import './style.scss';
import { DEFAULT_TASK_LIST } from "./enum";

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
                <div className="address-list">
                    <ModalsWorkingList
                        target='to-do-list-1'
                        modalHeight="750px"
                        title="Trapi Sakit Lambung !"
                        task="Lakukan Langkah Berikut !"
                        note="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada dolor sem. Donec sed commodo nulla. In mollis egestas turpis sit amet varius. Aenean laoreet placerat quam dictum sagittis."
                        toDoProgress={50}
                        taskList={DEFAULT_TASK_LIST}
                        progressNote="Perkembangan adalah kunci menuju keberhasilan, dan kelihatan trapi merupakan bukti perjalanan yang berarti."
                        finish={false}
                        finishDate="2020-10-23"
                        createdDate="2020-10-23"
                        updatedDate="2020-10-23"
                    />
                </div>
            </Container>
        </>
    );
};

export default WorkingFlow;
