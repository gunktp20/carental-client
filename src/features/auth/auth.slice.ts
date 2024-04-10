import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  step: 1 | 2 | 3;
  email: string;
  otp: string;
}

const initialState: IAuthState = {
  step: 1,
  email: "",
  otp: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setOtp: (state, action) => {
      return {
        ...state,
        otp: action.payload,
      };
    },
    setStep: (state, action) => {
      return {
        ...state,
        step: action.payload,
      };
    },
    setCredential: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
  },
});

export const { setCredential, setStep, setEmail, setOtp } = AuthSlice.actions;

export default AuthSlice.reducer;
