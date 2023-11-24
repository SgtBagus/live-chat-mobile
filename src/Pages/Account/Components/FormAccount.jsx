import React, { useState } from "react";
import update from "immutability-helper";
import { doc, updateDoc } from "firebase/firestore";
import  { useNavigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';

import { db } from "../../../firebase";

import InputText from "../../../Components/Form/InputText";

import Button from "../../../Components/Button";

import { catchError } from "../../../Helper/helper";
import { GENERATE_ERROR_MESSAGE } from "../../../Helper/error";

const FormAccount = ({
    dataUser: {
        uid: editUid, 
        displayName: editName,
        userDesc: editUserDesc,
        photoURL: editPhoto,
    },
    adminUid: {
        uid: adminUid, 
        displayName: adminName,
        userDesc: adminUserDesc,
        photoURL: adminPhoto,
    }
}) => {
    const [form, setForm] = useState({
        userName: editName,
        userDesc: editUserDesc,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmmit, setIsFormSubmmit] = useState(false);
    const [formValidate, setFormValidate] = useState({
        userNameValidate: editName !== '',
        userDescValidate: editUserDesc !== '',
    });

    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    };

    const { userName, userDesc } = form;
    const {
        userNameValidate,
        userDescValidate,
    } = formValidate;

    const changeInputHandler = async (type, val, e) => {
        const newForm = update(form, {
            [type]: { $set: val },
        });

        const typeKey = `${[type]}Validate`;
        const newFormValidate = update(formValidate, {
            [typeKey]: { $set: val !== "" },
        });

        await setForm(newForm);
        await setFormValidate(newFormValidate);
    };

    const validateForm = () => userNameValidate && userDescValidate;

    const submitHandel = async () => {
        setIsFormSubmmit(true);

        const isFormValid = await validateForm();
        if (!isFormValid) {
            setFormValidate({
                userNameValidate: false, userDescValidate: false,
            });
        } else {
            await setIsLoading(true);
            await handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            await updateDoc(doc(db, 'users', editUid), {
                displayName: userName, userDesc,
            });

            const combinedId = editUid > adminUid ? editUid + adminUid : adminUid + editUid || null;

            await updateDoc(doc(db, "userChats", editUid), {
                [combinedId + ".userInfo"]: {
                  uid: adminUid,
                  displayName: adminName,
                  photoURL: adminPhoto,
                },
            });
          
            await updateDoc(doc(db, "userChats", adminUid), {
                [combinedId + ".userInfo"]: {
                  uid: editUid,
                  displayName: userName,
                  photoURL: editPhoto,
                },
            });

            handelNavigate('/account');

            await setIsLoading(false);
        } catch (err) {
            NotificationManager.warning(catchError(err), 'Terjadi Kesalahan', 5000);
            await setIsLoading(false);
        }
    };

    return (
        <>
            <h2 style={{ color: "unset" }}>Ubah Profil !</h2>

            <div className="form-style-5">
                <div className="my-2">
                    <div className="form-floating">
                        <InputText
                            type="text"
                            id="userName"
                            name="userName"
                            value={userName}
                            changeEvent={(val, e) =>
                                changeInputHandler("userName", val, e)
                            }
                        />
                        <label htmlFor="userName">Nama Anda </label>
                    </div>
                    {!userNameValidate && isFormSubmmit && (
                        <span className="text-danger">
                            {GENERATE_ERROR_MESSAGE("Nama Anda", "valueMissing")}
                        </span>
                    )}
                </div>
                <div className="my-2">
                    <div className="form-floating">
                        <InputText
                            type="test"
                            id="userDesc"
                            name="userDesc"
                            value={userDesc}
                            changeEvent={(val, e) =>
                                changeInputHandler("userDesc", val, e)
                            }
                        />
                        <label htmlFor="userDesc">Keluhan Anda </label>
                    </div>
                    {!userDescValidate && isFormSubmmit && (
                        <span className="text-danger">
                            {GENERATE_ERROR_MESSAGE("Keluhan Anda", "valueMissing")}
                        </span>
                    )}
                </div>
                <div className="my-2 text-center">
                    <Button
                        className="btn-primary btn-block my-1"
                        label={isLoading ? "Memperoses...!!!" : "Ubah Profile"}
                        disabled={isLoading}
                        onClick={() => { submitHandel() }}
                    />
                </div>
            </div>
        </>
    );
};

export default FormAccount;
