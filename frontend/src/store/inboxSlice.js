import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInbox = createAsyncThunk(
  "inbox/fetchInbox",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/mail/inbox", {
        headers: { Authorization: token },
      });
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch inbox");
    }
  }
);

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inboxData: [],
    unseenMessagesCount:0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInbox.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inboxData = action.payload;
        state.unseenMessagesCount = action.payload.filter(msg => !msg.isSeen).length;
        console.log(state.inboxData)
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default inboxSlice.reducer;
