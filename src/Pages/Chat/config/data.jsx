import {
    setDoc, doc, updateDoc, serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

export const SETUP_MESSAGES_NEW = async (adminData, currentData, combinedId) => {
    const {
        uid: adminUid, displayName: adminDisplayName, photoURL: adminPhotoURL,
    } = adminData;
    
    const {
        uid: currentUid, displayName: currentDisplayName,photoURL: currentPhotoURL,
    } = currentData;
  
    await setDoc(doc(db, "chats", combinedId), { messages: [], allow_chat: false });
  
    await updateDoc(doc(db, "userChats", currentUid), {
        [combinedId + ".userInfo"]: {
          uid: adminUid,
          displayName: adminDisplayName,
          photoURL: adminPhotoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", adminUid), {
        [combinedId + ".userInfo"]: {
          uid: currentUid,
          displayName: currentDisplayName,
          photoURL: currentPhotoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
    });
}