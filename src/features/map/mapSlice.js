import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exitPosition: {},
  grid: [],
  heroPosition: {},
  currentLevel: 0,
  floors: [],
  floorsMapped: [],
  tenFloors: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    incrementLevel: (state, action) => {
      state.currentLevel++;
    },
    decrementLevel: (state, action) => {
      state.currentLevel--;
    },
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
    saveFloor: (state, action) => {
      state.floors[action.payload.level] = action.payload;
    },
    removeFloor: (state, action) => {
      state.floors.pop();
    },
    mapFloor: (state, action) => {
      state.floorsMapped.push(action.payload);
    },
    addTenFloors: (state, action) => {
      state.tenFloors.push(action.payload);
    },
    resetMap: () => initialState,
  },
});

export const {
  incrementLevel,
  decrementLevel,
  saveExitPosition,
  saveGrid,
  saveHeroPosition,
  saveFloor,
  removeFloor,
  mapFloor,
  addTenFloors,
  resetMap,
} = mapSlice.actions;

export default mapSlice.reducer;
