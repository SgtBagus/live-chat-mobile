import {
    setDoc, doc, serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

import { AI_DATA } from "./config";

const SETUP_MESSAGES_NEW = async (data, currentUser, callback) => {
    const { 
        UID: uidAI, DISPLAY_NAME: aiDisplayName, PHOTO_URL: aiPhotoUrl,
    } = AI_DATA;

    const {
        uid: currentUid,
        // displayName: currentDisplayName, photoURL: currentPhotoURL,
    } = currentUser;

    const AI_UID  = `chat-box-userAi-${currentUid}`
  
    await setDoc(doc(db, "chatBots", AI_UID), { messages: [], allow_chat: true });
    
    await setDoc(doc(db, "userChatBots", currentUid), {
        idChatBot: AI_UID,
        [AI_UID + ".userInfo"]: {
          uid: uidAI,
          displayName: aiDisplayName,
          photoURL: aiPhotoUrl,
        },
        [AI_UID + ".date"]: serverTimestamp(),
    });

    // await setDoc(doc(db, "userChatBots", currentUid), {
    //     [COMBINE_ID + ".userInfo"]: {
    //       uid: uidAI,
    //       displayName: aiDisplayName,
    //       photoURL: aiPhotoUrl,
    //     },
    //     [COMBINE_ID + ".date"]: serverTimestamp(),
    // });

    callback(AI_UID);
}

export default SETUP_MESSAGES_NEW;