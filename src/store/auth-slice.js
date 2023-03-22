import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AUTH",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;