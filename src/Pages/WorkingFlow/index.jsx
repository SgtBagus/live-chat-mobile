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

        const q = query(collection(db, "toDoLists"), where("uid", "==", uid));
        const GetDataTodo = onSnapshot(q, (querySnapshot) => {
            const getData = [];
            querySnapshot.forEach((doc) => {
                getData.push(doc.data());
            });

            const sortingList = getData.sort(({ createdDate: pCreatedDate}, { createdDate }) => (
                new Date(pCreatedDate.seconds * 1000 + pCreatedDate.nanoseconds/1000000) - new Date(createdDate.seconds * 1000 + createdDate.nanoseconds/1000000)
            ));
            
            setDataToDo(sortingList);
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
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="img-fluid"
                        alt="Banner Images"
                        style={{
                            filter: 'brightness(80%)',
                        }}
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
                                        target={`to-do-list-${data.id}`}
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
