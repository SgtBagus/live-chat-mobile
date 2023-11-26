import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, where, collection, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { NotificationManager } from "react-notifications";

import { auth, db } from "../../firebase";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import FormAccount from "./Components/FormAccount";
import Container from "../../Components/Container";

import { DEFAULT_IMAGE } from "../../Components/DefaultValue/config";

import { catchError } from "../../Helper/helper";

const Profile = () => {
  const [dataUser, setDataUser] = useState({
    displayName: "Username",
    photoURL: DEFAULT_IMAGE,
    email: "useremail@gmail.com",
    userDesc: "Desc",
  });
  const [adminUid, setAdminUid] = useState({
    displayName: "Username",
    photoURL: DEFAULT_IMAGE,
    email: "useremail@gmail.com",
  });

  const { dispatchLoading } = useContext(LoadingContext);
  const { currentUser } = useContext(AuthContext);
  const { displayName, photoURL, email, userDesc } = dataUser;

  useEffect(() => {
    dispatchLoading(true);

    const unSub = async () => {
      onSnapshot(doc(db, "users", currentUser.uid), async (doc) => {
        if (doc.exists()) {
          await setDataUser(doc.data());
        } else {
          NotificationManager.warning(
            "Gagal Mengambil Data Pengguna",
            "Terjadi Kesalahan",
            5000
          );
        }
      });

      const res = await query(
        collection(db, "users"),
        where("is_admin", "==", true)
      );
      await onSnapshot(
        res,
        async (data) => {
          data.forEach((doc) => {
            setAdminUid(doc.data());
          });

          dispatchLoading(false);
        },
        (error) => {
          NotificationManager.warning(
            catchError(error),
            "Terjadi Kesalahan",
            5000
          );
        }
      );
    };

    return () => {
      currentUser && unSub();
    };
  }, [currentUser, dispatchLoading]);

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

            <FormAccount dataUser={dataUser} adminUid={adminUid} />

            <div
              href="sign-in.html"
              className="btn ecommerce-btn theme-border mt-4"
              onClick={() => signOut(auth)}
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
