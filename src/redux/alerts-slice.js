import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
    error: "",
  },
  reducers: {
    ShowLoading(state) {
      state.loading = true;
    },
    HideLoading(state) {
      state.loading = false;
    },
    SetError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { ShowLoading, HideLoading, SetError } = alertsSlice.actions;
