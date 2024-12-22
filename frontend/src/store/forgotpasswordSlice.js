import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPasswordRequest = createAsyncThunk(
  "forgotPassword/request",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        userDetails
      );
      return response.data.message; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    resetDetails: { email: "", newPassword: "" },
    isSubmitting: false,
    feedbackMessage: "",
    showFeedbackModal: false,
    apiError: null,
  },
  reducers: {
    updateResetDetails: (state, action) => {
      const { field, value } = action.payload;
      state.resetDetails[field] = value;
    },
    clearFeedbackModal: (state) => {
      state.feedbackMessage = "";
      state.showFeedbackModal = false;
      state.apiError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.isSubmitting = true;
        state.feedbackMessage = "";
        state.apiError = null;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.feedbackMessage = action.payload;
        state.showFeedbackModal = true;
      })
      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        state.isSubmitting = false;
        state.apiError = action.payload;
        state.showFeedbackModal = true;
      });
  },
});

export const { updateResetDetails, clearFeedbackModal } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
