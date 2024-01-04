import { MenuItem, Select } from "@mui/material";

function ShowGameFilter() {
  return (
    <div className="Filter-wrapper">
      Show
      <Select
        size="small"
        className="options-value"
        id="show-filter-select"
        defaultValue="All Games"
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      >
        <MenuItem value="All Games">All Games</MenuItem>
        <MenuItem value="Ongoing Games">Ongoing Games</MenuItem>
        <MenuItem value="Finished Games">Finished Games</MenuItem>
        <MenuItem value="Paused Games">Paused Games</MenuItem>
        <MenuItem value="Scheduled Games">Scheduled Games</MenuItem>
      </Select>
    </div>
  );
}

export default ShowGameFilter;
