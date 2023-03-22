import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import CompanyFormSlice from "./form-company-slice";
import GameFormSlice from "./form-game-slice";
import UiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    ui: UiSlice.reducer,
    comapnyForm: CompanyFormSlice.reducer,
    gameForm: GameFormSlice.reducer,
  }
});

export default store;