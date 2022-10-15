import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1576e7b7-42ef-4b7c-a807-b012832dd60e",
      name: "Scroll of Return",
      item: "scroll",
      effect: "exit",
      description:
        "Use this scroll to exit the dungeon. Scrolls can only be used once.",
      icon: "/assets/scroll-unfurled.png",
      equippable: false,
      usable: true,
    },
    {
      id: "1",
      name: "Scroll of Healing I",
      item: "scroll",
      effect: "heal",
      value: 20,
      description:
        "Use this scroll to gain 20 HP. Scrolls can only be used once.",
      icon: "/assets/scroll-unfurled.png",
      equippable: false,
      usable: true,
    },
  ],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    resetInventory: () => initialState,
  },
});

export const { add, remove, resetInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
