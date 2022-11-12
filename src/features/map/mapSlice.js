import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exitPosition: {},
  grid: [],
  heroPosition: {},
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    saveExitPosition: (state, action) => {
      state.exitPosition.left = action.payload.left;
      state.exitPosition.top = action.payload.top;
    },
    saveGrid: (state, action) => {
      state.grid = action.payload;
    },
    saveHeroPosition: (state, action) => {
      state.heroPosition.left = action.payload.left;
      state.heroPosition.top = action.payload.top;
    },
    resetMap: () => initialState,
  },
});

export const { saveExitPosition, saveGrid, saveHeroPosition, resetMap } =
  mapSlice.actions;

export default mapSlice.reducer;
