import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },
    resetInventory: () => initialState,
  },
});

export const { add, remove, resetInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
