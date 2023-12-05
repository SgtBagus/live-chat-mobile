import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { NotificationManager } from "react-notifications";

import { auth, db } from "../firebase";

import { catchError } from "../Helper/helper";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [dataAdmin, setDataAdmin] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, dataAdmin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
