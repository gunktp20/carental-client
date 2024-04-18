import { createSlice } from "@reduxjs/toolkit";
import { AddUserFunc, IAuthState } from "./types";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState: IAuthState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

const addUserToLocalStorage: AddUserFunc = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredential: (state, action) => {
      addUserToLocalStorage(action.payload.user, action.payload.token);
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
