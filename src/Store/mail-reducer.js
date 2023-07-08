import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isComposeOpen: false,
    unReadEmails: 0
}

const mailSlice = createSlice({
    name: 'mail',
    initialState: initialState,
    reducers: {
        composeOpenHandler(state) {
            state.isComposeOpen = true;
        },
        composeCloseHandler(state) {
            state.isComposeOpen = false;
        },
        setUnReadEmails(state, actions) {
            state.unReadEmails = actions.payload;
        },
    }
})


export const { composeOpenHandler, composeCloseHandler, setUnReadEmails } = mailSlice.actions;

export default mailSlice.reducer;