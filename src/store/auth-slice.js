import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AUTH",
  initialState: {
    isLoggedIn: false,
    userRoles: [],
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setUserRole: (state, action) => {
      const newRole = action.payload;
      if (typeof newRole === "string") {
        state.userRoles = [...state.userRoles, newRole];
      } else if (Array.isArray(newRole)) {
        state.userRoles = [...state.userRoles, ...newRole];
      } else {
        state.userRoles = [];
      }
    },
    removeRole: (state, action) => {
      const role = action.payload;
      const updatedRole = state.userRoles.filter(
        (userRole) => userRole !== role
      );
      state.userRoles = updatedRole;
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;
