import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";

import InputText from "../../Components/Form/InputText";
import Button from "../../Components/Button";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const handelNavigate = (path) => {
    return navigate(path);
  };

  const changeInputHandler = async (type, val, e) => {
    const newForm = update(form, {
      [type]: { $set: val },
    });

    setForm(newForm);
  };

  const { email, password } = form;

  return (
    <>
      <div className="ecommerce-auth d-block bg-white">
        <div className="custom-container">
          <h1 className="top-title" style={{ color: "unset" }}>
            Hallo !
          </h1>
          <h2 style={{ color: "unset" }}>Silakan Login !</h2>
          <div class="form-style-5">
            <div class="form-floating mb-3">
              <InputText
                type="email"
                id="email"
                name="email"
                value={email}
                changeEvent={(val, e) => changeInputHandler("email", val, e)}
              />
              <label for="email">Email </label>
            </div>
            <div class="form-floating mb-4">
              <InputText
                type="email"
                id="password"
                name="password"
                value={password}
                changeEvent={(val, e) => changeInputHandler("password", val, e)}
              />
              <label for="password">Password</label>
            </div>

            <span
              className="theme-color text-end"
              onClick={() => handelNavigate("/forgot-password")}
            >
              Lupa password ?
            </span>
            <div className="my-2">
              <Button
                className="btn-primary btn-block my-1"
                label="Masuk"
                onClick={() => {
                  console.log("login");
                }}
              />
              <Button
                className="btn-default btn-block my-1"
                label="Daftar Akun"
                onClick={() => {
                  console.log("/register");
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
