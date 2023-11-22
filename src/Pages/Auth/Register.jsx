import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";
import { uploadFile } from "../../data/uploadFile";
import { sendEmailVerificationEvent } from '../../data/sendEmailVerification';

import InputText from "../../Components/Form/InputText";
import InputImage from "../../Components/Form/InputImage";

import Button from "../../Components/Button";
import { DEFAULT_IMAGE } from "../../Components/DefaultValue/config";

import { catchError, validateEmail } from "../../Helper/helper";
import { GENERATE_ERROR_MESSAGE } from "../../Helper/error";

const Register = () => {
    const [form, setForm] = useState({
        userName: "", userDesc: "", email: "", password: "", rePassword: "", fileInput: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmmit, setIsFormSubmmit] = useState(false);
    const [formValidate, setFormValidate] = useState({
        userNameValidate: false, userDescValidate: false, emailValidate: false,
        passwordValidate: false, rePasswordValidate: false, fileInputValidate: false,
    });
    const [errorMessages, setErrorMessages] = useState(null);

    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    };

    const { userName, userDesc, email, password, rePassword, fileInput } = form;
    const { userNameValidate, userDescValidate, emailValidate, passwordValidate, rePasswordValidate, fileInputValidate } = formValidate;

    const changeInputHandler = async (type, val, e) => {
        const newForm = update(form, {
            [type]: { $set: val },
        });

        const typeKey = `${[type]}Validate`;
        const newFormValidate = update(formValidate, {
            [typeKey]: { $set:
                type === 'email'
                ? validateEmail(val)
                : val !== ''
            },
        });

        await setForm(newForm);
        await setFormValidate(newFormValidate);
    };

    const validateForm = () => ( userNameValidate && userDescValidate && emailValidate && passwordValidate && rePasswordValidate && fileInputValidate );
    
    const submitHandel = async () => {
        setIsFormSubmmit(true);

        const isFormValid = await validateForm();
        if (!isFormValid) {
            setFormValidate({
                userNameValidate: false, userDescValidate: false, emailValidate: false,
                passwordValidate: false, rePasswordValidate: false, fileInputValidate: false,
            })
        } else {
            if (password !== rePassword) {
                setErrorMessages('Pastikan Perulangan Password anda sama !');
            } else {
                await setIsLoading(true);
                await handleSubmit();
            }
        }
    }

    const handleSubmit = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            if (!res) throw new Error('Email Tersebut Sudah Terdaftar');
            const { user: { uid } } = res;

            const date = new Date().getTime();
            const uploadImage = await uploadFile(fileInput, `userProfile/${userName.replaceAll(' ', '_') + date}`);
            if (!uploadImage) throw new Error('Foto Tidak Terupload');
            
            await updateProfile(res.user, { displayName: userName, photoURL: uploadImage });
            await setDoc(doc(db, "users", uid), {
                uid,
                displayName: userName,
                email,
                userDesc,
                photoURL: uploadImage,
                is_admin: false,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            await sendEmailVerificationEvent(res.user);

            handelNavigate('/')
        } catch (err) {
            setErrorMessages(catchError(err));
            await setIsLoading(false);
        }
    }

    return (
        <>
            <div className="ecommerce-auth d-block bg-white">
                <div className="custom-container">
                    <h1 className="top-title" style={{ color: "unset" }}>
                        Daftar !
                    </h1>
                    <h2 style={{ color: "unset" }}>Daktarkan Akun anda !</h2>
                    
                        <div className="form-style-5">
                            <div className="my-2">
                                <div className="form-floating">
                                    <InputText
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        value={userName}
                                        changeEvent={(val, e) => changeInputHandler("userName", val, e)}
                                    />
                                    <label htmlFor="userName">Nama Anda </label>
                                </div>
                                {
                                    (!userNameValidate && isFormSubmmit) && (
                                        <span className="text-danger">
                                            {GENERATE_ERROR_MESSAGE('Nama Anda', 'valueMissing')}
                                        </span>
                                    )
                                }
                            </div>
                            <div className="my-2">
                                <div className="form-floating">
                                    <InputText
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        changeEvent={(val, e) => changeInputHandler("email", val, e)}
                                    />
                                    <label htmlFor="email">Email Anda</label>
                                </div>
                                {
                                    (!emailValidate && isFormSubmmit) && (
                                        <span className="text-danger">
                                            {GENERATE_ERROR_MESSAGE('Email Anda', 'emailInvalid')}
                                        </span>
                                    )
                                }
                            </div>
                            <div className="my-2">
                                <div className="form-floating">
                                    <InputText
                                        type="test"
                                        id="userDesc"
                                        name="userDesc"
                                        value={userDesc}
                                        changeEvent={(val, e) => changeInputHandler("userDesc", val, e)}
                                    />
                                    <label htmlFor="userDesc">Keluhan Anda ! </label>
                                </div>
                                {
                                    (!userDescValidate && isFormSubmmit) && (
                                        <span className="text-danger">
                                            {GENERATE_ERROR_MESSAGE('Keluhan Anda !', 'valueMissing')}
                                        </span>
                                    )
                                }
                            </div>
                            <div className="my-2">
                                <div className="form-floating">
                                    <InputText
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        changeEvent={(val, e) => changeInputHandler("password", val, e)}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                {
                                    (!passwordValidate && isFormSubmmit) && (
                                        <span className="text-danger">
                                            {GENERATE_ERROR_MESSAGE('Password Anda !', 'valueMissing')}
                                        </span>
                                    )
                                }
                            </div>

                            <div className="my-2">
                                <div className="form-floating">
                                    <InputText
                                        type="password"
                                        id="rePassword"
                                        name="rePassword"
                                        value={rePassword}
                                        changeEvent={(val, e) => changeInputHandler("rePassword", val, e)}
                                    />
                                    <label htmlFor="rePassword">Ulangi Password Anda !</label>
                                </div>
                                {
                                    (!rePasswordValidate && isFormSubmmit) && (
                                        <span className="text-danger">
                                            {GENERATE_ERROR_MESSAGE('Ulangi Password Anda !', 'valueMissing')}
                                        </span>
                                    )
                                }
                            </div>

                            <div className="my-2">
                                <div className="form-floating">
                                    <InputImage
                                        value={fileInput ? URL.createObjectURL(fileInput) : DEFAULT_IMAGE}
                                        buttonText="Upload Foto Anda"
                                        noteString="Mohon upload File dengan format png, jpeg, dan jpg"
                                        changeEvent={(val, e) => changeInputHandler("fileInput", val, e)}
                                    />
                                </div>
                                {
                                    (!fileInputValidate && isFormSubmmit) && (
                                        <span className="text-danger">
                                            {GENERATE_ERROR_MESSAGE('Upload Foto Anda !', 'valueMissing')}
                                        </span>
                                    )
                                }
                            </div>
                            <div className="my-2 text-center">
                                <Button
                                    className="btn-primary btn-block my-1"
                                    label={isLoading ? 'Memperoses...!!!' : 'Daftar'}
                                    disabled={isLoading}
                                    onClick={() => { submitHandel(); }}
                                />
                                {
                                    errorMessages && (
                                        <span className="text-danger">
                                            {errorMessages}
                                        </span>
                                    )
                                }
                                <Button
                                    className="btn-default btn-block my-1"
                                    label="Sudah Memiliki Akun !"
                                    onClick={() => { handelNavigate('/login') }}
                                />
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Register;
