import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { NotificationManager } from 'react-notifications';

import InputText from "../../Components/Form/InputText";
import Button from "../../Components/Button";

import { auth, db } from "../../firebase";

import { catchError, validateEmail } from "../../Helper/helper";
import { GENERATE_ERROR_MESSAGE } from "../../Helper/error";

import { LoadingContext } from "../../context/LoadingContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [formValidate, setFormValidate] = useState({
    emailValidate: false,
    passwordValidate: false,
  });
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

  const { email, password } = form;
  const { emailValidate, passwordValidate } = formValidate;

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

  const validateForm = () => emailValidate && passwordValidate;

  const submitHandel = async () => {
    setIsFormSubmmit(true);

    const isFormValid = await validateForm();
    if (!isFormValid) {
      setFormValidate({
        emailValidate: false,
        passwordValidate: false,
      });
    } else {
      await setIsLoading(true);
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const res = query(collection(db, "users"), where("email", "==", email));
      onSnapshot(res, (querySnapshot) => {
        const { empty } = querySnapshot;
        if (!empty) {
          let isAdmin = false, loginEmail = '';
          querySnapshot.docs.forEach((x) => {
            const { email, is_admin } = x.data();
            isAdmin = is_admin;
            loginEmail = email;
          });

          if (!isAdmin) {
            signInWithEmailAndPassword(auth, loginEmail, password).then(() => {
              handelNavigate("/");
            }).catch(() => {
              NotificationManager.warning('Password Anda Salah', 'Terjadi Kesalahan', 5000);
              setIsLoading(false);
            });
          } else {
            NotificationManager.warning('Tidak Memiliki Akses', 'Terjadi Kesalahan', 5000);
            setIsLoading(false);
          }
        } else {
          NotificationManager.warning('Email Belum Terdaftar', 'Terjadi Kesalahan', 5000);
          setIsLoading(false);
        }
      }, (error) => {
        NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
        setIsLoading(false);
      });
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
            Hallo !
          </h1>
          <h2 style={{ color: "unset" }}>Silakan Login !</h2>
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
            <div className="my-2">
              <div className="form-floating">
                <InputText
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  changeEvent={(val, e) =>
                    changeInputHandler("password", val, e)
                  }
                />
                <label htmlFor="password">Password</label>
              </div>
              {!passwordValidate && isFormSubmmit && (
                <span className="text-danger">
                  {GENERATE_ERROR_MESSAGE("Password Anda !", "valueMissing")}
                </span>
              )}
            </div>

            <span
              className="theme-color text-end my-2"
              style={{ float: 'right' }} 
              onClick={() => handelNavigate("/forget-password")}
            >
              Lupa password ?
            </span>
            <div className="my-2 text-center">
              <Button
                className="btn-primary btn-block my-1"
                label={isLoading ? "Memperoses...!!!" : "Masuk"}
                disabled={isLoading}
                onClick={() => {
                  submitHandel();
                }}
              />
              <Button
                className="btn-default btn-block my-1"
                label="Daftar Akun"
                onClick={() => {
                  handelNavigate("/register");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
