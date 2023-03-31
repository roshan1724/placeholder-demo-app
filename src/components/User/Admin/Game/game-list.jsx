import "./admin-game.scss";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UiActions } from "../../../../store/ui-slice";
import {
  API_PATHS,
  ROUTE_PATHS,
  TABLE_GAME_STATUS,
  TABLE_USER_PROFILE_LIMIT,
} from "../../../../utilities/constants";
import CustomFilter from "../../../common/custom-filter/custom-filter";
import { useNavigate } from "react-router";

function AdminGameList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [gameList, setGameList] = useState([]);
  // Sort Mode can be one of 'none' | 'asc' | 'desc'
  const [sortMode, setSortMode] = useState({
    game_schedule: "none",
  });

  const availableFilters = [
    {
      filterKey: "GAMES",
      filterLabel: "Show",
      filterValue: "all",
      filterOptions: [
        { optionValue: "all", displayText: "All Games" },
        { optionValue: "ongoing", displayText: "Ongoing Games" },
        { optionValue: "finished", displayText: "Finished Games" },
        { optionValue: "paused", displayText: "Paused Games" },
        { optionValue: "scheduled", displayText: "Scheduled Games" },
      ],
    },
    {
      filterKey: "TIME",
      filterLabel: "Range",
      filterValue: "all",
      filterOptions: [
        { optionValue: "all", displayText: "All Time" },
        { optionValue: "week", displayText: "Last Week" },
        { optionValue: "month", displayText: "Last Month" },
        { optionValue: "year", displayText: "Last Year" },
        { optionValue: "ytd", displayText: "Year to Date" },
      ],
    },
    {
      filterKey: "GROUP_BY",
      filterLabel: "Group by",
      filterValue: "",
      filterOptions: [
        { optionValue: "", displayText: "Default" },
        { optionValue: "org", displayText: "Organization" },
        { optionValue: "scenario", displayText: "Game Scenario" },
        { optionValue: "status", displayText: "Game Status" },
      ],
    },
  ];

  const availableGameEdits = [
    {
      editKeyId: "GAME-Config_001",
      displayText: "Configurations",
      triggerHandler: (gameId) =>
        navigate(`${ROUTE_PATHS.ADMIN_CONFIG_GAME}/${gameId}`),
    },
  ];

  const tableColumnHeaders = [
    { headerKey: "org_name", headerLabel: "Organization" },
    { headerKey: "game_scenario", headerLabel: "Game" },
    { headerKey: "game_schedule", headerLabel: "Start Date & Time" },
    { headerKey: "participants", headerLabel: "Participants" },
    { headerKey: "spectators", headerLabel: "Spectators" },
    { headerKey: "status", headerLabel: "Status" },
    { headerKey: "game_action", headerLabel: "" },
  ];

  const tableUserProfileLimitCount = TABLE_USER_PROFILE_LIMIT;

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API call to get game list
    setTimeout(() => {
      fetch(API_PATHS.GAME_LIST_DATA)
        .then((response) => response.json())
        .then((response) => {
          setGameList(response.data);
          dispatch(UiActions.setShowLoader(false));
        })
        .catch((error) => {
          console.error(error);
        });
    }, 200);
  }, [dispatch]);

  const handleKeyEventsOnSearch = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      console.log("To be searched value is : ", event.target.value);
      event.target.value = "";
    }
  };

  const handleSelectionChange = (filterKey, selectedOption) => {
    console.log(
      `filterKey ==> ${filterKey}\nselectedOption ==> ${selectedOption}`
    );
  };

  const handleTableSortClick = (tableKey) => {
    const updatedSortMode = { ...sortMode };
    updatedSortMode[tableKey] =
      updatedSortMode[tableKey] === "none"
        ? "asc"
        : updatedSortMode[tableKey] === "asc"
        ? "desc"
        : "none";
    // TODO: Trigger API Update / Refresh here

    setSortMode(updatedSortMode);
  };

  const getTooltipContent = (userData) => {
    return (
      <div className="user-detail-menu">
        {userData.map((data, dataIndex) => (
          <div className="user-detail-list" key={`user-${dataIndex}`}>
            <div className="avatar-wrapper">
              {data.profile_img && data.profile_img !== "" ? (
                <img
                  className="profile-image"
                  src={data.profile_img}
                  alt={data.user_name}
                />
              ) : (
                <span className="no-profile">{data.user_name.at(0)}</span>
              )}
            </div>
            <div className="user-info">
              <span className="user-name">{data.user_name}</span>
              <span className="user-name">{data.user_dept}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Get Organisation Name for Cell Data
  const getOrgName = (keyName, gameData) => {
    return (
      <div className="org-wrapper">
        <span>{gameData[keyName]}</span>
      </div>
    );
  };

  // Get Game Scenario Cell Data
  const getScenarioName = (keyName, gameData) => {
    return (
      <div className="scenario-wrapper">
        <span className="icon-wrapper me-2">
          {["fish", "anchor"].includes(gameData[keyName].icon_name[0]) ? (
            <span className="material-icons">phishing</span>
          ) : (
            <i className={`fa-solid fa-${gameData[keyName].icon_name[0]}`}></i>
          )}
        </span>
        <span>{gameData[keyName].scenario_name}</span>
      </div>
    );
  };

  // Get Game Schedule Cell
  const getGameSchedule = (keyName, gameData) => {
    return (
      <div className="schedule-wrapper">
        <span>
          {gameData[keyName].start_date}, {gameData[keyName].start_time}
        </span>
      </div>
    );
  };

  // GetGameUserProfiles used in Participants and Spectators Column
  const getGameUserProfiles = (keyName, gameData) => {
    return (
      <div className="table-cell-user-avatars tooltip-wrapper">
        {gameData[keyName].map((userData, userIndex) => (
          <div
            key={`table-user-${keyName}-${userIndex}`}
            className={`avatar-wrapper clickable`}
            style={{ right: `${userIndex * 10}px` }}
          >
            {userIndex <= tableUserProfileLimitCount - 1 ? (
              userData.profile_img && userData.profile_img !== "" ? (
                <img
                  className="profile-image"
                  src={userData.profile_img}
                  alt={userData.user_name}
                />
              ) : (
                <span className="no-profile">{userData.user_name.at(0)}</span>
              )
            ) : null}
          </div>
        ))}
        {tableUserProfileLimitCount < gameData[keyName].length && (
          <div
            className="avatar-wrapper clickable"
            style={{ right: `${tableUserProfileLimitCount * 10}px` }}
          >
            <span className="additional-profiles">
              +{gameData[keyName].length - tableUserProfileLimitCount}
            </span>
          </div>
        )}
        <div className="tooltip-content content-right">
          {getTooltipContent(gameData[keyName])}
        </div>
      </div>
    );
  };

  const getGameStatus = (gameStatus) => {
    const uiDataObj = { iconName: "", actionText: "", navigationLink: "" };
    if (gameStatus === TABLE_GAME_STATUS.ONGING) {
      uiDataObj.iconName = "repeat";
      uiDataObj.actionText = TABLE_GAME_STATUS.ONGING;
    } else if (gameStatus === TABLE_GAME_STATUS.SCHEDULED) {
      uiDataObj.iconName = "clock";
      uiDataObj.actionText = TABLE_GAME_STATUS.SCHEDULED;
    } else if (gameStatus === TABLE_GAME_STATUS.FINISHED) {
      uiDataObj.iconName = "circle-check";
      uiDataObj.actionText = TABLE_GAME_STATUS.FINISHED;
    }
    return (
      <div className="game-status-wrapper" data-game-status={`${gameStatus}`}>
        <span className="icon-wrapper me-2">
          <i className={`fa-solid fa-${uiDataObj.iconName}`}></i>
        </span>
        <span className="status-text">{uiDataObj.actionText}</span>
      </div>
    );
  };

  // Game Action Cell Data
  const getAdminGameAction = (gameData) => {
    return (
      <div className="game-admin-action clickable">
        <div className="dropdown">
          <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
            <span className="icon-wrapper me-2">
              <i className={`fa-solid fa-gear`}></i>
            </span>
            <span className="status-text">Edit Game</span>
          </button>
          <ul className="dropdown-menu">
            {availableGameEdits.map((editData) => (
              <li key={editData.editKeyId}>
                <div
                  className="dropdown-item"
                  onClick={() => editData.triggerHandler(gameData.game_id)}
                >
                  {editData.displayText}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const getTableCellData = (keyName, gameData) => {
    switch (keyName) {
      case "org_name":
        return getOrgName(keyName, gameData);
      case "game_scenario":
        return getScenarioName(keyName, gameData);
      case "game_schedule":
        return getGameSchedule(keyName, gameData);
      case "participants":
      case "spectators":
        return getGameUserProfiles(keyName, gameData);
      case "status":
        return getGameStatus(gameData[keyName]);
      case "game_action":
        return getAdminGameAction(gameData);
      default:
        return "";
    }
  };

  return (
    <Fragment>
      <section className="admin-gamelist px-3">
        <div className="page-header-wrapper pb-3">
          <h1 className="title c-font-20">View Games</h1>
          {/* <p className="subtitle c-font-16 m-0">Hit Configure</p> */}
        </div>

        <div className="page-content-wrapper">
          <div className="table-header-actions">
            <div className="search-box-wrapper">
              <div className="search-wrapper">
                <input
                  type="search"
                  name="user-commands"
                  id="user-commands"
                  onKeyUp={handleKeyEventsOnSearch}
                  placeholder="Search Options"
                />
                <img src="/images/search_grey_icon.png" alt="Search Icon" />
              </div>
            </div>
            <div className="filter-box-wrapper">
              {availableFilters.map((filterData, filterIndex) => (
                <CustomFilter
                  filterData={filterData}
                  selectionChange={handleSelectionChange}
                  key={`filterdata-${filterIndex}`}
                />
              ))}
            </div>
          </div>
          <div className="table-content-wrapper">
            <div className="table-responsive">
              <table className="table game-list-table">
                <thead>
                  <tr>
                    {tableColumnHeaders.map((headerObj, headerIndex) => (
                      <th scope="col" key={`header-label-${headerIndex}`}>
                        {headerObj.headerLabel}
                        {headerObj.headerKey === "game_schedule" ? (
                          <span
                            className="icon-wrapper sort-icon ps-2"
                            data-sort_mode={sortMode[headerObj.headerKey]}
                            onClick={() =>
                              handleTableSortClick(headerObj.headerKey)
                            }
                          >
                            <i className="fa-solid fa-arrow-up"></i>
                            <i className="fa-solid fa-arrow-down"></i>
                          </span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gameList.map((gameData, dataIndex) => (
                    <Fragment key={`table-data-row-${dataIndex}`}>
                      <tr className={`table-row align-middle`}>
                        {tableColumnHeaders.map((headerObj, headerIndex) => (
                          <td
                            key={`table-data-row-${dataIndex}-column-${headerIndex}`}
                            className={`table-cell`}
                          >
                            {getTableCellData(headerObj.headerKey, gameData)}
                          </td>
                        ))}
                      </tr>
                      <tr className={`row-spacer`}>
                        <td
                          className="table-cell"
                          colSpan={tableColumnHeaders.length}
                        ></td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default AdminGameList;
