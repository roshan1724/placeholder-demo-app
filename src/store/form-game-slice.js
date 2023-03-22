import { createSlice } from "@reduxjs/toolkit";
import { getGameDetailFormInitailState } from "../forms/game-detail-form";

const GameFormSlice = createSlice({
  name: "GAME_FORM",
  initialState: {
    scenario_form: '',
    details_form: JSON.parse(JSON.stringify(getGameDetailFormInitailState())),
  },
  reducers: {
    updateGameForm: (state, action) => {
      const { formName, formData } = action.payload;
      console.log(`formName => `, formName, `\nformData => `, formData);
      state[formName] = JSON.parse(JSON.stringify(formData));
    },
    resetGameForm: (state, action) => {
      const { formName, initialData } = action.payload;
      const initialFormData = JSON.parse(JSON.stringify(initialData));
      state[formName] = initialFormData;
    },
  }
});

export const GameFormActions = GameFormSlice.actions;

export default GameFormSlice;
