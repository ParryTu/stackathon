import { configureStore } from "@reduxjs/toolkit";

import { translateReducer } from "./translateRedux";

export const store = configureStore({
  reducer: {
    translateReducer,
  },
});
