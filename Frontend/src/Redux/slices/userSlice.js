// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores user data
  isLoggedIn: false, // Tracks login status
  isAdmin: false, // Tracks admin status
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log("inside of user slice login");
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.role === "admin"; // Check role
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
