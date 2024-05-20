import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("Auth Token"),
  },
  reducers: {
    SetIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { SetIsAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;
