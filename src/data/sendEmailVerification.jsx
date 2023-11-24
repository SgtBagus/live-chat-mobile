import { sendEmailVerification } from "firebase/auth";
import { NotificationManager } from "react-notifications";

import { catchError } from "../Helper/helper";

export const sendEmailVerificationEvent = async (data) => {
    try {
        await sendEmailVerification(data);
    } catch (err) {
        NotificationManager.warning(catchError(err), 'Terjadi Kesalahan', 5000);
    }
}
