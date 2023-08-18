import { createSlice } from "@reduxjs/toolkit";
import {
  TABLE_GAME_GROUP_BY_FILTER,
  TABLE_GAME_STATUS_FILTER,
  TABLE_GAME_TIME_FILTER,
} from "../utilities/constants";

const GamelistSlice = createSlice({
  name: "GAMELIST",
  initialState: {
    filters: {
      GAMES_STATUS: TABLE_GAME_STATUS_FILTER.ALL,
      TIME: TABLE_GAME_TIME_FILTER.ALL,
      GROUP_BY: TABLE_GAME_GROUP_BY_FILTER.NONE,
    },
    searchText: "",
  },
  reducers: {
    // Search Actions
    setSearchText: (state, action) => {
      const _searchText = action?.payload;
      state.searchText =
        typeof _searchText === "string" ? _searchText.trim() : "";
    },

    // Gamelist Filter Actions
    // action.payload to be like { filterParam: string, filterValue: string | string[] }
    setGamelistFilters: (state, action) => {
      const filterKey = action?.payload.filterParam;
      const filterValue = action?.payload.filterValue;
      const filters = { ...state.filters };
      if (Object.keys(state.filters).includes(filterKey)) {
        filters[filterKey] = filterValue;
      }
      state.filters = { ...filters };
    },
  },
});

export const GamelistActions = GamelistSlice.actions;
export default GamelistSlice;
