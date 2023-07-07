import authReducer from "./auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./mail-reducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer
    },
});

export default store;
