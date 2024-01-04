import FilterButton from "./FilterButton";
import SearchFilter from "./SearchFilter";

function FilterHeaderBar() {
  const filterLabel1 = "Show";
  const filterLabel2 = "Range";
  const filterLabel3 = "Group by";
  const filterOptions1 = [
    "All Games",
    "Ongoing Games",
    "Finished Games",
    "Paused Games",
    "Schedule Games",
  ];
  const filterOptions2 = [
    "All Time",
    "Last Week",
    "Last Month",
    "Last Year",
    "Year to Date",
  ];
  const filterOptions3 = ["Default", "Game Scenario", "Game Status"];
  return (
    <div className="header-filter-wrapper">
      <div>
        <SearchFilter />
      </div>
      <div className="header-select-filter-wrapper">
        <FilterButton
          filterLabel={filterLabel1}
          filterOptions={filterOptions1}
        />
        <FilterButton
          filterLabel={filterLabel2}
          filterOptions={filterOptions2}
        />
        <FilterButton
          filterLabel={filterLabel3}
          filterOptions={filterOptions3}
        />
      </div>
    </div>
  );
}

export default FilterHeaderBar;
