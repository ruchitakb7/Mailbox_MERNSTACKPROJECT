import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const intialtoken=localStorage.getItem('token') || null
const initailId=localStorage.getItem('userId')


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
       
      const response = await axios.post("http://localhost:5000/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
    
      return response.data;
    } catch (error) {
      console.log(error)
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unknown error occurred." );
    }
  }
);

export const loginUser= createAsyncThunk(
  "auth/loginUser",
  async (userData,{rejectWithValue}) => {
    try{
      const response = await axios.post("http://localhost:5000/login", userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    }catch(error){
      if(error.response)
      {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unknown error occurred." );
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    formData: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    userData: {
      email: "",
      password: "",
    },
    showModal: false,
    modalMessage: "",
    formsignErrors: "",
    formlogErrors: "",
    token:intialtoken,
    userId:initailId,
    islogin:!!intialtoken,
    name:""
  },
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    updateUserData:(state,action)=>{
      const { name, value } = action.payload;
      state.userData[name]=value
    },
    resetModal: (state) => {
      state.showModal = false;
      state.modalMessage = "";
    },
    clearMessages: (state) => {
      state.formsignErrors = "";
      state.formlogErrors = "";
    },
    logout:(state)=>{
      
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      state.token=""
      state.userId=""
      state.islogin=false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.showModal = false;
        state.modalMessage = "";
        state.formsignErrors = "";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.showModal = true;
        state.modalMessage = action.payload.message;
        state.formData = { email: "", password: "", confirmPassword: "" };
      })
      .addCase(signupUser.rejected, (state, action) => {

        state.formsignErrors = action.payload ||  "An unknown error occurred.";
      
      })
      .addCase(loginUser.pending,(state)=> {
        state.showModal = false;
        state.modalMessage = "";
        state.formlogErrors = "";
      
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.showModal = true;
        state.modalMessage = action.payload.message;
        state.token=action.payload.token;
        state.userId=action.payload.userId;
        localStorage.setItem('token',state.token)
        localStorage.setItem('userId',state.userId)
        state.islogin=true;
        state.name=state.userData.email;
        state.userData = { email:"", password: ""};
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.formlogErrors=action.payload||" something went wrong "

      })
  },
});

export const { updateFormData, resetModal, clearMessages,updateUserData,logout } = authSlice.actions;
export default authSlice.reducer;
