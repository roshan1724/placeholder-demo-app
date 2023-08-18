import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../../../store/ui-slice";
import {
  API_PATHS,
  TABLE_GAME_FILTERS,
  TABLE_GAME_GROUP_BY_FILTER,
  TABLE_GAME_STATUS_FILTER,
  TABLE_GAME_TIME_FILTER,
} from "../../../utilities/constants";
import EmptyGame from "./emptyGame";
import GameList from "./gameList";
import "./Home.scss";

function GameHome() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.showLoader);
  const searchText = useSelector((state) => state.gamelist.searchText);
  const filterData = useSelector((state) => state.gamelist.filters);

  const [gameList, setGameList] = useState([]);
  const [filterParam, setFilterParam] = useState("");
  const [filtersList, setFiltersList] = useState([
    {
      filterKey: TABLE_GAME_FILTERS.GAMES_STATUS,
      filterLabel: "Show",
      filterValue: TABLE_GAME_STATUS_FILTER.ALL,
      filterOptions: [
        {
          optionValue: TABLE_GAME_STATUS_FILTER.ALL,
          displayText: "All Games",
        },
        {
          optionValue: TABLE_GAME_STATUS_FILTER.ONGING,
          displayText: "Ongoing Games",
        },
        {
          optionValue: TABLE_GAME_STATUS_FILTER.FINISHED,
          displayText: "Finished Games",
        },
        {
          optionValue: TABLE_GAME_STATUS_FILTER.PAUSED,
          displayText: "Paused Games",
        },
        {
          optionValue: TABLE_GAME_STATUS_FILTER.SCHEDULED,
          displayText: "Scheduled Games",
        },
      ],
    },
    {
      filterKey: TABLE_GAME_FILTERS.TIME,
      filterLabel: "Range",
      filterValue: TABLE_GAME_TIME_FILTER.ALL,
      filterOptions: [
        {
          optionValue: TABLE_GAME_TIME_FILTER.ALL,
          displayText: "All Time",
        },
        {
          optionValue: TABLE_GAME_TIME_FILTER.WEEK,
          displayText: "Last Week",
        },
        {
          optionValue: TABLE_GAME_TIME_FILTER.MONTH,
          displayText: "Last Month",
        },
        {
          optionValue: TABLE_GAME_TIME_FILTER.YEAR,
          displayText: "Last Year",
        },
        {
          optionValue: TABLE_GAME_TIME_FILTER.YEAR_TO_DATE,
          displayText: "Year to Date",
        },
      ],
    },
    {
      filterKey: TABLE_GAME_FILTERS.GROUP_BY,
      filterLabel: "Group by",
      filterValue: TABLE_GAME_GROUP_BY_FILTER.NONE,
      filterOptions: [
        {
          optionValue: TABLE_GAME_GROUP_BY_FILTER.NONE,
          displayText: "Default",
        },
        {
          optionValue: TABLE_GAME_GROUP_BY_FILTER.GAME_SCENARIO,
          displayText: "Game Scenario",
        },
        {
          optionValue: TABLE_GAME_GROUP_BY_FILTER.GAME_STATUS,
          displayText: "Game Status",
        },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    const apiPath = `${API_PATHS.GAME_LIST_DATA}${
      filterParam.length > 0 ? `?${filterParam}` : ""
    }`;
    // API call to get game list
    setTimeout(() => {
      fetch(apiPath)
        .then((response) => response.json())
        .then((response) => {
          setGameList(response.data);
          dispatch(UiActions.setShowLoader(false));
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, [dispatch, filterParam]);

  useEffect(() => {
    if (searchText && searchText.length > 0) {
      handleSearchTextUpdate(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    let filterParam = "";
    Object.keys(filterData).forEach((filterKey) => {
      if (filterData[filterKey] && filterData[filterKey] !== "All")
        filterParam += `${filterParam.length > 0 ? "&" : ""}${filterKey}=${
          filterData[filterKey]
        }`;
    });

    if (filterParam.length > 0) {
      setFilterParam(filterParam);
    }

    // Also update the availableFilters list
    const updatedFilterList = filtersList.map((filterEle) => {
      return {
        ...filterEle,
        filterValue: filterData[filterEle.filterKey],
      };
    });
    setFiltersList(updatedFilterList);

    // Do not include filtersList in dependency array below
  }, [filterData]);

  const handleSearchTextUpdate = (searchText) => {
    console.log(`API called for updated search text ==> `, searchText);
  };

  return (
    !loader && (
      <div className="game-home">
        {gameList && gameList.length > 0 ? (
          <GameList gameListData={gameList} filters={filtersList} />
        ) : (
          <EmptyGame />
        )}
      </div>
    )
  );
}

export default GameHome;
