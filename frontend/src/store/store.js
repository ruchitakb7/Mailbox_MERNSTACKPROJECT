import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import mailViewReducer from "./mailviewSlice"


const store=configureStore({
    reducer:{
        auth:authReducer,
        mailview:mailViewReducer,
     }
})

export default store