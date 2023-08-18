import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import CompanyFormSlice from "./form-company-slice";
import GameFormSlice from "./form-game-slice";
import UiSlice from "./ui-slice";
import GameReportSlice from "./game-report-slice";
import GamelistSlice from "./gamelist-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    ui: UiSlice.reducer,
    comapnyForm: CompanyFormSlice.reducer,
    gameForm: GameFormSlice.reducer,
    gameReport: GameReportSlice.reducer,
    gamelist: GamelistSlice.reducer,
  },
});

export default store;
