import { createSlice } from "@reduxjs/toolkit";
import { playerStats } from "shared";

const initialState = {
  name: playerStats.name,
  img: playerStats.img,
  health: playerStats.maxHealth,
  maxHealth: playerStats.maxHealth,
  exp: playerStats.exp,
  gold: playerStats.gold,
  level: playerStats.level,
  primary: playerStats.primary,
  secondary: playerStats.secondary,
  armor: playerStats.armor,
  physicalDef: playerStats.physicalDef,
  magicalDef: playerStats.magicalDef,
  speed: playerStats.speed,
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setImage: (state, action) => {
      state.img = action.payload;
    },
    takeDamage: (state, action) => {
      state.health =
        state.health - action.payload > 0 ? state.health - action.payload : 0;
    },
    increaseExp: (state, action) => {
      state.exp += action.payload;
    },
    increaseGold: (state, action) => {
      state.gold += action.payload;
    },
    increaseLevel: (state, action) => {
      state.level++;
      state.maxHealth += action.payload;
      state.health = state.maxHealth;
    },
    changePrimary: (state, action) => {
      state.primary = action.payload;
    },
    changeSecondary: (state, action) => {
      state.secondary = action.payload;
    },
    changeArmor: (state, action) => {
      state.armor = action.payload;
    },
    changeItem: (state, action) => {
      state[action.payload.item] = action.payload;
    },
    reset: (state) => {
      state.health = initialState.health;
      state.maxHealth = initialState.maxHealth;
      state.exp = initialState.exp;
      state.gold = initialState.gold;
      state.level = initialState.level;
      state.primary = initialState.primary;
      state.secondary = initialState.secondary;
      state.armor = initialState.armor;
      state.physicalDef = initialState.physicalDef;
      state.magicalDef = initialState.magicalDef;
      state.speed = initialState.speed;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setName,
  setImage,
  takeDamage,
  increaseExp,
  increaseGold,
  increaseLevel,
  changePrimary,
  changeSecondary,
  changeArmor,
  changeItem,
  reset,
} = heroSlice.actions;

export default heroSlice.reducer;
