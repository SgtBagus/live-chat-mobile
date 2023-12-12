import React from "react";

import Container from "../../../Components/Container";

import Task from "./Task";
import InputArea from "../../../Components/Form/InputArea";
import Button from "../../../Components/Button";

const PopupWorkingList = () => {
    return (
        <Container style={{ overflow: 'auto' }}>
            <div className="order-detail-box m-0 p-0 border-0">
                <div className="product-title">
                    <h4>Lakukan Beberapa Langka Berikut !</h4>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada dolor sem. Donec sed commodo nulla. In mollis egestas turpis sit amet varius. Aenean laoreet placerat quam dictum sagittis.</p>
                <h6 className="h5 fw-bold d-flex text-align-center justify-content-end">< i className="ri-calendar-line me-1" /> 19 Feb 2023</h6>
                <hr />
                
                <ul className="order-tracking-list pop-up-list m-0">
                    <Task
                        finish={true}
                        title="Senam Perut"
                        task="Lakukan seperti Video Dibawah ini !"
                        note="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        attact="https://c2.kemono.su/data/44/d7/44d72b2a9f1e1964c58285cc392be38f021af54b397970b55ddb2fe726eb77ac.mp4?f=Expectation_1080p_fantia.mp4"
                    />
                    <Task
                        finish={false}
                        title="Yes ini Title Kedua"
                        task="Lakukan seperti gambar Dibawah ini !"
                        note="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        attact="https://moewalls.com/wp-content/uploads/2023/01/ushio-noa-blue-archive-thumb-728x410.jpg"
                    />
                    <Task
                        finish={false}
                        title="Yes ini Title Kedua"
                        task="Lakukan seperti gambar Dibawah ini !"
                        note="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                </ul>
                <hr />

                <h6 className="h5 fw-bold d-flex text-align-center my-2">Progress atau Keluhan Anda ! </h6>
                <InputArea
                    rows="5"
                    changeEvent={() => {}}
                    placeholder="Masukan Progress atau Keluhan anda disini, selama anda menjalankan trapi !"
                />
                <Button
                    className="btn btn-success my-2"
                    label="Simpan Progress atau Keluhan anda !"
                    onClick={() => {}}
                />
            </div>
        </Container>
    );
};

PopupWorkingList.propTypes = {
};

PopupWorkingList.defaultProps = {
};

export default PopupWorkingList;
