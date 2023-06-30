import axios from "axios";


export const signUp = async ({ email, password }) => {
    try {
        const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbNmpEEsbbdrEpH1QB8gfXLLdU37YNMNM`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
}

export const signIn = async ({ email, password }) => {
    try {
        const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbNmpEEsbbdrEpH1QB8gfXLLdU37YNMNM`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
}