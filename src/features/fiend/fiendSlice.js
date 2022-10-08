import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const fiendSlice = createSlice({
  name: "fiend",
  initialState,
  reducers: {
    setFiend: (state, action) => {
      return action.payload;
    },
    resetFiend: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setFiend, resetFiend } = fiendSlice.actions;

export default fiendSlice.reducer;
