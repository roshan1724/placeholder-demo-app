import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

function FilterButton(props) {
  const { filterLabel, filterOptions } = props;
  const a = (
    <span>
      {filterOptions[0]}
      <KeyboardArrowDownSharpIcon />
    </span>
  );
  return (
    <div className="filter-wrapper">
      <span className="filterLabel-wrapper">{filterLabel}</span>

      <Select
        size="small"
        className="options-value"
        id="show-filter-select"
        defaultValue={filterOptions[0]}
        sx={{
          borderRadius: "40px",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      >
        {filterOptions.map((curElem, index) => {
          return (
            <MenuItem value={curElem} key={index}>
              {curElem}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

export default FilterButton;
