import { createSlice } from "@reduxjs/toolkit";
import { PRINTABLE_REPORT_TYPE } from "../utilities/constants";

const GameReportSlice = createSlice({
  name: "GAME_REPORT",
  initialState: {
    reportData: {
      initialReport: null,
      modifiedReport: null,
    },
    printableReport: PRINTABLE_REPORT_TYPE.GENERATED_REPORT,
  },
  reducers: {
    setInitialReport: (state, action) => {
      const { reportData } = action.payload;
      // Creating a deep Copy of response
      state.reportData.initialReport = JSON.parse(JSON.stringify(reportData));
    },

    setModifiedReport: (state, action) => {
      const { reportData } = action.payload;
      // Creating a deep Copy of response
      state.reportData.modifiedReport = JSON.parse(JSON.stringify(reportData));
    },

    setReportToPrint: (state, action) => {
      const reportType = action.payload;
      console.log("Report Type recieved as : ", reportType);
      state.printableReport = reportType;
    },
  },
});

export const GameReportActions = GameReportSlice.actions;

export default GameReportSlice;
