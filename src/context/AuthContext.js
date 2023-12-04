import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { NotificationManager } from "react-notifications";

import { auth, db } from "../firebase";

import { catchError } from "../Helper/helper";

import { DEFAULT_IMAGE } from "../Components/DefaultValue/config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    uid: null, 
    displayName: null,
    userDesc: null,
    photoURL: DEFAULT_IMAGE,
  });
  const [dataAdmin, setDataAdmin] = useState({
    uid: null, 
    displayName: null,
    photoURL: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });

    const res = query(collection(db, "users"), where("is_admin", "==", true));
    onSnapshot(res, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDataAdmin(doc.data());
      });

      setIsLoading(false);
    }, (error) => {
      NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, dataAdmin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
