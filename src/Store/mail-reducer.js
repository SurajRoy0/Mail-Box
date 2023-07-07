import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isComposeOpen: false,
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
    }
})


export const { composeOpenHandler, composeCloseHandler } = mailSlice.actions;

export default mailSlice.reducer;