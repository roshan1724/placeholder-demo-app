import React from "react";
import "./GameNewDashboard.css";
import data from "../../data/data.json";
import {
  ThemeProvider,
  Typography,
  createTheme,
  Box,
  Paper,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import StartDateTimeColumn from "./GameNew_Components/StartDateTimeColumn";
import GameColumn from "./GameNew_Components/GameColumn";
import ParticipantsColumn from "./GameNew_Components/ParticipantsColums";
import StatusColumn from "./GameNew_Components/StatusColumn";
import ViewColumn from "./GameNew_Components/ViewColumn";
import ActionColumn from "./GameNew_Components/ActionColumn";
import SpectatorsColumn from "./GameNew_Components/SpectatorsColumn";
import FilterHeaderBar from "./GameNew_Components/FilterHeaderBar";
import SortableColumnHeader from "./GameNew_Components/SortableColumnHeader";

function GameNewDashboard() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 9,
      bottom: params.isLastVisible ? 3 : 7,
    };
  }, []);

  const rows = data.data;
  const column = [
    {
      field: "game",
      headerName: "Game",
      flex: 1.5,
      renderCell: (params) => (
        <GameColumn gameName={params.row.game_scenario.scenario_name} />
      ),
      sortable: false,
    },
    {
      field: "startDateTime",
      headerName: "Start Date & Time",
      renderHeader: (params) => (
        <SortableColumnHeader headName="Start Date & Time" />
      ),
      flex: 1.2,
      renderCell: (params) => (
        <StartDateTimeColumn
          startDate={params.row.game_schedule.start_date}
          startTime={params.row.game_schedule.start_time}
        />
      ),
      sortable: false,
    },
    {
      field: "participants",
      headerName: "Participants",
      flex: 1,
      renderCell: (params) => (
        <ParticipantsColumn participants={params.row.participants} />
      ),
      sortable: false,
    },
    {
      field: "spectators",
      headerName: "Spectators",
      flex: 1,
      renderCell: (params) => (
        <SpectatorsColumn spectators={params.row.spectators} />
      ),
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusColumn status={params.value} />,
      sortable: false,
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      renderCell: (params) => <ActionColumn status={params.row.status} />,
      sortable: false,
    },
    {
      field: "view",
      headerName: "",
      flex: 1,
      renderCell: (params) => <ViewColumn status={params.row.status} />,
      sortable: false,
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="full-component-wrapper">
        <div className="component-head-wrapper">
          <Typography
            className="title"
            variant="h6"
            component="h1"
            gutterBottom
          >
            Your Games
          </Typography>
          <Button
            variant="contained"
            size="small"
            className="add-button-wrapper"
          >
            <AddIcon fontSize="small" />
            <span>Add New Game</span>
          </Button>
        </div>

        <div>
          <FilterHeaderBar />
        </div>

        <div className="container-wrapper">
          <Paper
            className="paper-wrapper"
            component={Box}
            style={{ height: "30rem" }}
          >
            <DataGrid
              className="datagrid-wrapper"
              rows={rows}
              columns={[...column]}
              disableColumnMenu
              rowHeight={45}
              getRowSpacing={getRowSpacing}
              hideFooter={true}
              disableRowSelectionOnClick={true}
              disableColumnSelector={true}
              sx={{
                border: 0,
                backgroundColor: "#000000",
                "& .MuiDataGrid-row": {
                  borderColor: "#233554",
                  borderStyle: "solid",
                  borderRadius: 3,
                  backgroundColor: "#292929",
                  border: "none",
                },
              }}
            />
          </Paper>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default GameNewDashboard;
