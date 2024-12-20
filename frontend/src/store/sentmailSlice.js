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

// Create the slice
const sentmailSlice = createSlice({
  name: 'getmail',
  initialState: {
    sentMails: [],
    status: 'idle',
    error: null,
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
      });
  },
});


export default sentmailSlice.reducer;
