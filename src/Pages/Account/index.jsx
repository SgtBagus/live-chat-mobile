import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth"

import { auth, db } from "../../firebase";

import { AuthContext } from "../../context/AuthContext";

import Container from "../../Components/Container";
import { DEFAULT_IMAGE } from "../../Components/DefaultValue/config";
import FormAccount from "./Components/FormAccount";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMEssage] = useState(null);

  const [dataUser, setDataUser] = useState({
      displayName: 'Username',
      photoURL: DEFAULT_IMAGE,
      email: 'useremail@gmail.com',
      userDesc: 'Desc',
  });

  const { currentUser } = useContext(AuthContext);
  const { displayName, photoURL, email, userDesc } = dataUser;
  
  useEffect(() => {
    setIsLoading(true);

    const unSub = () => {
      onSnapshot(doc(db, "users", currentUser.uid), async (doc) => {
        if (doc.exists()) {
            await setDataUser(doc.data());
            setIsLoading(false);
        } else {
          setErrorMEssage('Gagal Mengambil Data Pengguna');
        }
      });
    };

    return () => { currentUser && unSub() };
  }, [currentUser]);

  return (
    <>
      <Container>
        <div className="custom-container">
          <div className="setting-box">
            {
              isLoading
              ? (
                <div className="text-center">
                  <span className="h1 h-100">
                    {errorMessage ? errorMessage : 'Memuat Data......!'}
                  </span>
                </div>
              )
              : (
                <>
                  <div className="profile-image border-bottom my-3">
                    <div className="sidebar-profile">
                      <div className="profile-image">
                        <img src={photoURL} className="img-fluid h-100" alt="foto-account" style={{ objectFit: "cover" }} />
                      </div>

                      <div className="profile-name">
                        <h4>{displayName}</h4>
                        <h5>{email}</h5>
                        <span className="my-2">
                          {userDesc}
                        </span>
                      </div>
                    </div>
                  </div>

                  <FormAccount
                    dataUser={dataUser}
                  />
                </>
              )
            }

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
