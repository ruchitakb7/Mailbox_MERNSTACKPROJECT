import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import mailViewReducer from "./mailviewSlice"
import composeReducer from "./composeSlice"
import sentMailReducer from"./sentmailSlice"
import inboxReducer from "./inboxSlice"
import forgotpassReducer from "./forgotpasswordSlice"

const store=configureStore({
    reducer:{
        auth:authReducer,
        mailview:mailViewReducer,
        compose:composeReducer,
        getmail:sentMailReducer,
        inbox:inboxReducer,
        forgotPass:forgotpassReducer
     }
})

export default store