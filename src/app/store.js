import { configureStore } from "@reduxjs/toolkit";

import translate from "translate";

let GOOGLE_KEY =
  "/Users/parrytu/Downloads/civil-rarity-348820-c558a10d6b64.json";
// translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.key = GOOGLE_KEY;

let initialState = "";

let TRANSLATE_TEXT = "TRANSLATE_TEXT";

export const translateAction = (text) => {
  return { type: TRANSLATE_TEXT, text };
};

export const translateText = (text) => {
  return async (dispatch) => {
    let translated = await translate(text, "es");
    dispatch(translateAction(translated));
  };
};

export function translateReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSLATE_TEXT:
      return action.text;
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    translateReducer,
  },
});
