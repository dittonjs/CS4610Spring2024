import { createSlice } from "@reduxjs/toolkit";
import { parseJwt } from "../utils/parse_jwt";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    authToken: window.localStorage.getItem("jwt"),
    settings: parseJwt(window.localStorage.getItem("jwt")),
  },
  reducers: {
    setAuthToken: (state, {payload}) => {
      if (payload) {
        state.settings = parseJwt(payload)
        window.localStorage.setItem("jwt", payload);
      } else {
        window.localStorage.removeItem("jwt");
      }
      state.authToken = payload;
    },
  }
});

export const { setAuthToken } = applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;