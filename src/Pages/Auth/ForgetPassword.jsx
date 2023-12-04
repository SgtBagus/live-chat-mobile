import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { sendPasswordResetEmail } from "firebase/auth";
import { NotificationManager } from 'react-notifications';

import { auth } from "../../firebase";

import InputText from "../../Components/Form/InputText";
import Button from "../../Components/Button";

import { catchError, validateEmail } from "../../Helper/helper";
import { GENERATE_ERROR_MESSAGE } from "../../Helper/error";

import { LoadingContext } from "../../context/LoadingContext";

const ForgetPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const [formValidate, setFormValidate] = useState({ emailValidate: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmmit, setIsFormSubmmit] = useState(false);
  
  const { dispatchLoading } = useContext(LoadingContext);

  useEffect(() => {
      dispatchLoading(false);
  });

  const navigate = useNavigate();
  const handelNavigate = (path) => {
    return navigate(path);
  };

  const { email } = form;
  const { emailValidate } = formValidate;

  const changeInputHandler = async (type, val, e) => {
    const newForm = update(form, {
      [type]: { $set: val },
    });

    const typeKey = `${[type]}Validate`;
    const newFormValidate = update(formValidate, {
      [typeKey]: { $set: type === "email" ? validateEmail(val) : val !== "" },
    });

    await setForm(newForm);
    await setFormValidate(newFormValidate);
  };

  const submitHandel = async () => {
    setIsFormSubmmit(true);

    if (!emailValidate) {
      setFormValidate({ emailValidate: false });
    } else {
      await setIsLoading(true);
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          NotificationManager.warning("Email Sudah Terkirim di Inbox Anda !", 'Terjadi Kesalahan', 5000);
        })
        .catch((error) => {
          throw new Error(error);
        });
        await setIsLoading(false);
    } catch (err) {
      NotificationManager.warning(catchError(err), 'Terjadi Kesalahan', 5000);
      await setIsLoading(false);
    }
  };

  return (
    <>
      <div className="ecommerce-auth d-block bg-white">
        <div className="custom-container">
          <h1 className="top-title" style={{ color: "unset" }}>
            Lupa !!
          </h1>
          <h2 style={{ color: "unset" }}>Silakan Masukan Email !</h2>
          <div className="form-style-5">
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
              {!emailValidate && isFormSubmmit && (
                <span className="text-danger">
                  {GENERATE_ERROR_MESSAGE("Email Anda", "emailInvalid")}
                </span>
              )}
            </div>
            <div className="my-2 text-center">
              <Button
                className="btn-primary btn-block my-1"
                label={isLoading ? "Memperoses...!!!" : "Kirim Email !"}
                disabled={isLoading}
                onClick={() => {
                  submitHandel();
                }}
              />
              <Button
                className="btn-default btn-block my-1"
                label="Kembali Login !"
                onClick={() => {
                  handelNavigate("/login");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
