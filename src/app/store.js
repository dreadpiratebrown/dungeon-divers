import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "../features/hero/heroSlice";
import fiendReducer from "../features/fiend/fiendSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import { loadState } from "./storage";

export default configureStore({
  reducer: {
    hero: heroReducer,
    fiend: fiendReducer,
    inventory: inventoryReducer,
  },
  preloadedState: loadState(),
});
