import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import heroReducer from "../features/hero/heroSlice";
import fiendReducer from "../features/fiend/fiendSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import mapReducer from "../features/map/mapSlice";
import { loadState } from "./storage";

export default configureStore({
  reducer: {
    app: appReducer,
    hero: heroReducer,
    fiend: fiendReducer,
    inventory: inventoryReducer,
    map: mapReducer,
  },
  preloadedState: loadState(),
});
