import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMail = createAsyncThunk(
  'mail/sentMail',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/mail/sent",{
          headers: {
            Authorization: token,
          },
        });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to Fetch data');
    }
  }
);


export const deletemailbySender=createAsyncThunk("mail/deletemailbySender",
  async({token,id},{rejectWithValue})=>{
    try{
      const response=await axios.delete(`http://localhost:5000/mail/sent/delete/${id}`,{
        headers:{Authorization:token},
      })
      console.log(response)
      return response.data.message
    }
    catch(error){
      return rejectWithValue(error.response?.data ||"Failed to delete mail, try again one more time.")
    }
  }
)


const sentmailSlice = createSlice({
  name: 'getmail',
  initialState: {
    sentMails: [],
    status: 'idle',
    error: null,
    response:''
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sentMails=action.payload;
        console.log(state.sentMails)
      })
      .addCase(getMail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(deletemailbySender.fulfilled,(state,action)=>{
        state.status="succeeded"
        state.response=action.payload
      })
      .addCase(deletemailbySender.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
  },
});


export default sentmailSlice.reducer;
