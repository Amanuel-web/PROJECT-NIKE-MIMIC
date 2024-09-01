import { configureStore } from "@reduxjs/toolkit";
import shoesReducer from "./shoeSlice";

export const store = configureStore({
  reducer: {
    shoes: shoesReducer,
  },
});
