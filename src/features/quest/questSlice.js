import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quests: [],
  completedQuests: []
};

export const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    addQuest: (state, action) => {
      state.quests.push(action.payload);
    },
    completeQuest: (state, action) => {
      state.quests = state.quests.filter((quest) => quest != action.payload);
      state.completedQuests.push(action.payload);
    },
    resetQuests: () => initialState,
  },
});

export const { addQuest, completeQuest, resetQuests } = questSlice.actions;

export default questSlice.reducer;
