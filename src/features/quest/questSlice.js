import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quests: [],
};

export const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    addQuest: (state, action) => {
      state.quests.push(action.payload);
    },
    removeQuest: (state, action) => {
      state.quests = state.quests.filter((quest) => quest != action.payload);
    },
    resetQuests: () => initialState,
  },
});

export const { addQuest, removeQuest, resetQuests } = questSlice.actions;

export default questSlice.reducer;
