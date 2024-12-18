import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import mailViewReducer from "./mailviewSlice"
import composeReducer from "./composeSlice"
import sentMailReducer from"./sentmailSlice"

const store=configureStore({
    reducer:{
        auth:authReducer,
        mailview:mailViewReducer,
        compose:composeReducer,
        getmail:sentMailReducer,
     }
})

export default store