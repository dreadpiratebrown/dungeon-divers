import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exit: false,
  teleportRecharging: false,
  battlesToRecharge: 0,
  introTextViewed: false,
  goldEarned: 0,
  fameEarned: 0,
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
    addGold: (state, action) => {
      state.goldEarned += action.payload;
    },
    addFame: (state, action) => {
      state.fameEarned += action.payload;
    },
    playAgain: (state) => {
      state.exit = initialState.exit;
      state.teleportRecharging = initialState.teleportRecharging;
      state.battlesToRecharge = initialState.battlesToRecharge;
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
  addGold,
  addFame,
  playAgain,
  resetApp,
} = appSlice.actions;

export default appSlice.reducer;
