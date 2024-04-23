import {
    setDoc, doc, updateDoc, serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

const SETUP_MESSAGES_NEW = async (adminData, currentData, combinedId, callback = () => {}) => {
    const {
        uid: adminUid, displayName: adminDisplayName, photoURL: adminPhotoURL,
    } = adminData;
    
    const {
        uid: currentUid, displayName: currentDisplayName, photoURL: currentPhotoURL,
    } = currentData;
  
    await setDoc(doc(db, "chats", combinedId), { messages: [], allow_chat: true });
    
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

    callback();
}

export default SETUP_MESSAGES_NEW;