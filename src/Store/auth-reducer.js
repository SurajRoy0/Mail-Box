import { createSlice } from "@reduxjs/toolkit"


const localAuthData = JSON.parse(localStorage.getItem('authData'));

const initialState = {
    token: localAuthData && localAuthData.token ? localAuthData.token : '',
    isLogin: localAuthData && localAuthData.token ? true : false,
    userEmail: localAuthData && localAuthData.userEmail ? localAuthData.userEmail : '',
    userName: localAuthData && localAuthData.userName ? localAuthData.userName : '',
    isProfileCompleted: false
};


const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        signIn(state, action) {
            const { token, userName, userEmail } = action.payload;
            state.token = token;
            state.userName = userName;
            state.userEmail = userEmail;
            state.isLogin = true;

            const authData = { token, userName, userEmail };
            localStorage.setItem('authData', JSON.stringify(authData));
        },
        signOut(state, action) {
            state.token = '';
            state.userName = '';
            state.isLogin = false;
            localStorage.removeItem('authData');
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;