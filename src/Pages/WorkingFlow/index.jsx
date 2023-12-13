import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import Container from "../../Components/Container";
import Button from "../../Components/Button";

import ModalsWorkingList from "./Components/Modals";

import { db } from "../../firebase";
import { LoadingContext } from "../../context/LoadingContext";
import { AuthContext } from "../../context/AuthContext";

import { catchError } from "../../Helper/helper";

import './style.scss';

const WorkingFlow = () => {
    const [dataTodo, setDataToDo] = useState(null);

    const navigate = useNavigate();

    const { currentUser: { uid } } = useContext(AuthContext) || { currentUser: { uid: null } };
    const { dispatchLoading } = useContext(LoadingContext);

    useEffect(() => {
        dispatchLoading(true);

        const res = query(collection(db, "toDoLists"), where("uid", "==", uid));

        const GetDataTodo = onSnapshot(res, (querySnapshot) => {
            const returnData = [];
            querySnapshot.forEach((doc) => returnData.push(doc.data()));

            setDataToDo(returnData);
            dispatchLoading(false);
        }, (error) => {
          NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
        });
    
        return () => { 
          if (uid) {
            GetDataTodo();
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
            {
                dataTodo ? (
                    <Container
                        className="ecommerce-address-section"
                    >
                        <div className="address-list">
                            {
                                dataTodo.map((data, idx) => (
                                    <ModalsWorkingList
                                        key={`${idx}-${data.id}`}
                                        target='to-do-list-1'
                                        modalHeight="750px"
                                        dataTodo={data}
                                    />
                                ))
                            }
                        </div>
                    </Container>
                ) : (
                    <Container
                        className="w-100 text-center my-2"
                        style={{
                            opacity: '0.5',
                        }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Service_mark.svg/2560px-Service_mark.svg.png"
                            className="img-fluid" alt=""
                            style={{
                                width: '200px',
                                objectFit: 'cover',
                            }}
                        />
                    </Container>
                )
            }
        </>
    );
};

export default WorkingFlow;
