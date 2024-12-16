import { createSlice } from "@reduxjs/toolkit";

const initialState={
    activeSection:'compose',
   
}

const MailviewSlice=createSlice({
    name:'mailview',
    initialState,
    reducers:{
        handleSectionChange(state,action){
             console.log(action.payload)
            state.activeSection=action.payload
        },
        handleClose(state){
            state.activeSection='compose'
        },
      
    }
})

export const {handleSectionChange,handleClose} =MailviewSlice.actions
export default MailviewSlice.reducer