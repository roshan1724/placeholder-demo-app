import { MenuItem, Select } from "@mui/material";

function GroupByFilter() {
  return (
    <div className="Filter-wrapper">
      Group by
      <Select
        size="small"
        className="options-value"
        id="groupBy-filter-select"
        defaultValue="Default"
      >
        <MenuItem value="Default">Default</MenuItem>
        <MenuItem value="Game Scenario">Game Scenario</MenuItem>
        <MenuItem value="Game Status">Game Status</MenuItem>
      </Select>
    </div>
  );
}

export default GroupByFilter;
