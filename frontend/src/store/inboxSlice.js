import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInbox = createAsyncThunk(
  "inbox/fetchInbox",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/mail/inbox", {
        headers: { Authorization: token },
      });
      return response.data.data; // Assuming data array is under 'data'
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch inbox");
    }
  }
);

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    messages: [],
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
        state.messages = action.payload;
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default inboxSlice.reducer;
