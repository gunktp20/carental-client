import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {}

const initialState: IAuthState = {};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredential: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
  },
});

export const { setCredential } = AuthSlice.actions;

export default AuthSlice.reducer;
