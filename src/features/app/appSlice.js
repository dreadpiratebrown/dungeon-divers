import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exit: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    exitDungeon: (state, action) => {
      state.exit = action.payload;
    },
    resetApp: () => initialState,
  },
});

export const { exitDungeon, resetApp } = appSlice.actions;

export default appSlice.reducer;
