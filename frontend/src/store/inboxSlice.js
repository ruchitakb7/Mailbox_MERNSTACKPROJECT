import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInbox = createAsyncThunk(
  "inbox/fetchInbox",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/mail/inbox", {
        headers: { Authorization: token },
      });
      console.log(response)
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch inbox");
    }
  }
);

export const deleteinboxmail=createAsyncThunk("inbox/deleteinboxmail",
  async({token,id},{rejectWithValue})=>{
    try{
      const response=await axios.delete(`http://localhost:5000/mail/inbox/delete/${id}`,{
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

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inboxData: [],
    unseenMessagesCount:0,
    status: "idle",
    error: null,
    response:'',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInbox.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "succeeded";
        state.inboxData = action.payload;
        console.log(state.inboxData)
        state.unseenMessagesCount = state.inboxData.filter(msg => !msg.isSeen).length;
        console.log(state.inboxData)
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(deleteinboxmail.fulfilled, (state, action) => {
        console.log(action.payload,'delete')
        state.status="succeeded"
        state.response=action.payload
      })
      .addCase(deleteinboxmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default inboxSlice.reducer;
