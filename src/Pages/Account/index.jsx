import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import FormAccount from "./Components/FormAccount";
import Container from "../../Components/Container";

import { DEFAULT_IMAGE } from "../../Components/DefaultValue/config";

import { catchError } from "../../Helper/helper";

const Profile = () => {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({
    displayName: "Username",
    photoURL: DEFAULT_IMAGE,
    email: "useremail@gmail.com",
    userDesc: "Desc",
  });

  const { dispatchLoading } = useContext(LoadingContext);
  const { currentUser: { uid }, dataAdmin } = useContext(AuthContext) || { currentUser: { uid: null }, dataAdmin: null };
  const { displayName, photoURL, email, userDesc } = dataUser;

  useEffect(() => {
    dispatchLoading(true);
  
    const res = query(collection(db, "users"), where("uid", "==", uid));
    const GetDataUser = onSnapshot(res, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDataUser(doc.data());
      });

      dispatchLoading(false);
    }, (error) => {
      NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
    });

    return () => { 
      if (uid) {
        GetDataUser();
      } else {
        dispatchLoading(true);
      }
    };
  }, [dispatchLoading, uid]);

  const singOutHandel = () => {
    signOut(auth);
    return navigate("/login");
  }

  return (
    <>
      <Container>
        <div className="custom-container">
          <div className="setting-box">
            <div className="profile-image border-bottom my-3">
              <div className="sidebar-profile">
                <div className="profile-image">
                  <img
                    src={photoURL}
                    className="img-fluid"
                    alt="foto-account"
                  />
                </div>

                <div className="profile-name">
                  <h4>{displayName}</h4>
                  <h5>{email}</h5>
                  <span className="my-2">{userDesc}</span>
                </div>
              </div>
            </div>

            <FormAccount dataUser={dataUser} dataAdmin={dataAdmin} />

            <div
              href="sign-in.html"
              className="btn ecommerce-btn theme-border mt-4"
              onClick={() => singOutHandel()}
            >
              Logout
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
