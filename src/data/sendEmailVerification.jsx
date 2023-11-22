import { sendEmailVerification } from "firebase/auth";

export const sendEmailVerificationEvent = async (data) => {
    try {
        await sendEmailVerification(data);
    } catch (err) {
    }
}
