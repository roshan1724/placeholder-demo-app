import { MenuItem, Select } from "@mui/material";

function RangeTimeFilter() {
  return (
    <div className="Filter-wrapper">
      Range
      <Select
        size="small"
        className="options-value"
        id="range-filter-select"
        defaultValue="All Time"
      >
        <MenuItem value="All Time">All Time</MenuItem>
        <MenuItem value="Last Week">Last Week</MenuItem>
        <MenuItem value="Last Month">Last Month</MenuItem>
        <MenuItem value="Last Year">Last Year</MenuItem>
        <MenuItem value="Year to Date">Year to Date</MenuItem>
      </Select>
    </div>
  );
}

export default RangeTimeFilter;
