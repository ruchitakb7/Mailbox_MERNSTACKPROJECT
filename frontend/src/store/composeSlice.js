
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMail = createAsyncThunk(
  'mail/sendMail',
  async ({ mailDetails, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/compose",
        mailDetails,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to send mail');
    }
  }
);



const mailSlice = createSlice({
  name: 'compose',
  initialState: {
    to: '',
    subject: '',
    content: '',
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    sentMails: [],
  },
  reducers: {
    updateTo: (state, action) => {
      state.to = action.payload;
    },
    updateSubject: (state, action) => {
      state.subject = action.payload;
    },
    updateContent: (state, action) => {
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sentMails.push(action.payload);
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { updateTo, updateSubject, updateContent } = mailSlice.actions;
export default mailSlice.reducer;
