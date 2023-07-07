import axios from "axios";

export const formatEmail = (email) => {
    return email.replace(/[.@]/g, '-');
};


export const sentForInbox = async ({ toEmail, data }) => {
    const formattedEmail = await formatEmail(toEmail)
    try {
        const res = await axios.post(
            `https://mail-box-14db9-default-rtdb.firebaseio.com/${formattedEmail}/inbox.json`,
            {
                data
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
}

export const sentForSentbox = async ({ fromEmail, data }) => {
    const formattedEmail = await formatEmail(fromEmail)
    try {
        const res = await axios.post(
            `https://mail-box-14db9-default-rtdb.firebaseio.com/${formattedEmail}/inbox.json`,
            {
                data
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
}

export const gettingRecivedEmails = async ({ fromEmail }) => {
    const formattedEmail = await formatEmail(fromEmail)
    try {
        const res = await axios.get(
            `https://mail-box-14db9-default-rtdb.firebaseio.com/${formattedEmail}/sent.json`);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const gettingSentEmails = async ({ fromEmail }) => {
    const formattedEmail = await formatEmail(fromEmail)
    try {
        const res = await axios.get(
            `https://mail-box-14db9-default-rtdb.firebaseio.com/${formattedEmail}/sent.json`);
        return res.data;
    } catch (error) {
        return error;
    }
}