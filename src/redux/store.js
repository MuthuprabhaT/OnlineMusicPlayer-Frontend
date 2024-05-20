import { configureStore } from "@reduxjs/toolkit";
import { alertsSlice } from "./alerts-slice";
import { playerSlice } from "./playerSlice";
import { authenticationSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    alerts: alertsSlice.reducer,
    player: playerSlice.reducer,
    auth: authenticationSlice.reducer,
  },
});

export default store;
