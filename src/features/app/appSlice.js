import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exit: false,
  teleportRecharging: false,
  battlesToRecharge: 0,
  introTextViewed: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    exitDungeon: (state, action) => {
      state.exit = action.payload;
    },
    rechargeTeleport: (state, action) => {
      state.teleportRecharging = action.payload;
    },
    setRecharge: (state, action) => {
      state.battlesToRecharge = action.payload;
    },
    decrementRecharge: (state) => {
      state.battlesToRecharge--;
      if (state.battlesToRecharge === 0) {
        state.teleportRecharging = false;
      }
    },
    viewIntroText: (state) => {
      state.introTextViewed = true;
    },
    resetApp: () => initialState,
  },
});

export const {
  exitDungeon,
  rechargeTeleport,
  setRecharge,
  decrementRecharge,
  viewIntroText,
  resetApp,
} = appSlice.actions;

export default appSlice.reducer;
