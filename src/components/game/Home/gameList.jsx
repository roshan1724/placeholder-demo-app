import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TABLE_GAME_SCHEDULE_ACTION, TABLE_GAME_STATUS, ROUTE_PATHS, TABLE_GAME_USER_ACTION } from '../../../utilities/constants';
import './Home.scss';

import CustomFilter from '../../common/custom-filter/custom-filter';

function GameList ({ gameListData }) {

  const navigate = useNavigate();
  // Sort Mode can be one of 'none' | 'asc' | 'desc'
  const [sortMode, setSortMode] = useState({
    game_schedule: 'none'
  });

  const availableFilters = [
    {
      filterKey: 'GAMES',
      filterLabel: 'Show',
      filterValue: 'all',
      filterOptions: [
        { optionValue: "all", displayText: 'All Games' },
        { optionValue: "ongoing", displayText: 'Ongoing Games' },
        { optionValue: "finished", displayText: 'Finished Games' },
        { optionValue: "paused", displayText: 'Paused Games' },
        { optionValue: "scheduled", displayText: 'Scheduled Games' },
      ]
    },
    {
      filterKey: 'TIME',
      filterLabel: 'Range',
      filterValue: 'all',
      filterOptions: [
        { optionValue: "all", displayText: 'All Time' },
        { optionValue: "week", displayText: 'Last Week' },
        { optionValue: "month", displayText: 'Last Month' },
        { optionValue: "year", displayText: 'Last Year' },
        { optionValue: "ytd", displayText: 'Year to Date' },
      ]
    },
    {
      filterKey: 'GROUP_BY',
      filterLabel: 'Group by',
      filterValue: '',
      filterOptions: [
        { optionValue: "", displayText: 'Default' },
        { optionValue: "scenario", displayText: 'Game Scenario' },
        { optionValue: "status", displayText: 'Game Status' },
      ]
    }
  ];
  const tableColumnHeaders = [
    { headerKey: "game_scenario", headerLabel: "Game" },
    { headerKey: "game_schedule", headerLabel: "Start Date & Time" },
    { headerKey: "participants", headerLabel: "Participants" },
    { headerKey: "spectators", headerLabel: "Spectators" },
    { headerKey: "status", headerLabel: "Status" },
    { headerKey: "schedule_action", headerLabel: "" },
    { headerKey: "user_action", headerLabel: "" },
  ];

  const tableUserProfileLimitCount = 3;

  const handleKeyEventsOnSearch = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      console.log('To be searched value is : ', event.target.value);
      event.target.value = '';
    }
  }

  const handleSelectionChange = (filterKey, selectedOption) => {
    if (filterKey === 'GAMES') {
      console.log(selectedOption);
    }
  }

  const handleTableSortClick = (tableKey) => {
    const updatedSortMode = { ...sortMode };
    updatedSortMode[tableKey] = updatedSortMode[tableKey] === 'none'
      ? 'asc'
      : updatedSortMode[tableKey] === 'asc'
        ? 'desc'
        : 'none'
    // TODO: Trigger API Update / Refresh here

    setSortMode(updatedSortMode);
  }

  const getTooltipContent = (userData) => {
    return (
      userData.map((data, dataIndex) => (
        <span key={`user-${dataIndex}`}></span>
      ))
    )
  }

  // Get Game Scenario Cell Data
  const getScenarioName = (keyName, gameData) => {
    return (
      <div className="scenario-wrapper">
        <span className="icon-wrapper me-2">
        {
          ['fish', 'anchor'].includes(gameData[keyName].icon_name[0])
          ? <span className="material-icons">phishing</span>
          : <i className={`fa-solid fa-${gameData[keyName].icon_name[0]}`}></i>
        }
        </span>
        <span>{gameData[keyName].scenario_name}</span>
      </div>
    );
  }

  // Get Game Schedule Cell
  const getGameSchedule = (keyName, gameData) => {
    return (
      <div className="schedule-wrapper">
        <span>{ gameData[keyName].start_date }, { gameData[keyName].start_time }</span>
      </div>
    );
  }

  // GetGameUserProfiles used in Participants and Spectators Column
  const getGameUserProfiles = (keyName, gameData) => {
    return (
      <div className="table-cell-user-avatars tooltip-wrapper">
      {
        gameData[keyName].map((userData, userIndex) => (
          <div key={`table-user-${keyName}-${userIndex}`}
            className={`avatar-wrapper clickable`}
            style={{right: `${userIndex * 10}px`}}>
          {
            userIndex <= (tableUserProfileLimitCount - 1)
            ? userData.profile_img && userData.profile_img !== ""
              ? <img className='profile-image' src={userData.profile_img} alt={userData.user_name}/>
              : <span className='no-profile'>{userData.user_name.at(0)}</span>
            : null
          }
          </div>
        ))
      }
      {
        tableUserProfileLimitCount < gameData[keyName].length  && (
          <div
            className="avatar-wrapper clickable"
            style={{right: `${tableUserProfileLimitCount * 10}px`}}>
            <span className='additional-profiles'>+{gameData[keyName].length - tableUserProfileLimitCount}</span>
          </div>
        )
      }
        <div className="tooltip-content">
        {
          getTooltipContent(gameData[keyName])
        }
        </div>
      </div>
    );
  }

  const getGameStatus = (gameStatus) => {
    const uiDataObj = { iconName: '', actionText: '', navigationLink: '' };
    if (gameStatus === TABLE_GAME_STATUS.ONGING) {
      uiDataObj.iconName = 'repeat';
      uiDataObj.actionText = TABLE_GAME_STATUS.ONGING;
    } else if (gameStatus === TABLE_GAME_STATUS.SCHEDULED) {
      uiDataObj.iconName = 'clock';
      uiDataObj.actionText = TABLE_GAME_STATUS.SCHEDULED;
    } else if (gameStatus === TABLE_GAME_STATUS.FINISHED) {
      uiDataObj.iconName = 'circle-check';
      uiDataObj.actionText = TABLE_GAME_STATUS.FINISHED;
    }
    return (
      <div className="game-status-wrapper" data-game-status={`${gameStatus}`}>
        <span className="icon-wrapper me-2">
          <i class={`fa-solid fa-${uiDataObj.iconName}`}></i>
        </span>
        <span className="status-text">{uiDataObj.actionText}</span>
      </div>
    );
  }

  const getScheduleAction = (gameStatus) => {
    const uiDataObj = { iconName: '', actionText: '', navigationLink: '' };
    if (gameStatus === TABLE_GAME_STATUS.ONGING) {
      uiDataObj.iconName = 'rotate-right';
      uiDataObj.actionText = TABLE_GAME_SCHEDULE_ACTION.RESTART;
    } else if (gameStatus === TABLE_GAME_STATUS.SCHEDULED) {
      uiDataObj.iconName = 'pen-to-square';
      uiDataObj.actionText = TABLE_GAME_SCHEDULE_ACTION.EDIT;
    } else if (gameStatus === TABLE_GAME_STATUS.FINISHED) {
      uiDataObj.iconName = 'copy';
      uiDataObj.actionText = TABLE_GAME_SCHEDULE_ACTION.DUPLICATE;
    }
    return (
      <div className="game-schedule-action clickable" data-game-status={`${gameStatus}`}>
        <span className="icon-wrapper me-2">
          <i class={`fa-solid fa-${uiDataObj.iconName}`}></i>
        </span>
        <span className="status-text">{uiDataObj.actionText}</span>
      </div>
    );
  }

  const getUserAction = (gameStatus) => {
    const uiDataObj = { iconName: '', actionText: '', navigationLink: '' };
    if (gameStatus === TABLE_GAME_STATUS.ONGING) {
      uiDataObj.iconName = 'chess-rook';
      uiDataObj.actionText = TABLE_GAME_USER_ACTION.VIEW_GAME;
      uiDataObj.navigationLink = ROUTE_PATHS.GAME_PLAYBOARD;
    } else if (gameStatus === TABLE_GAME_STATUS.SCHEDULED) {
      uiDataObj.iconName = '';
      uiDataObj.actionText = '';
    } else if (gameStatus === TABLE_GAME_STATUS.FINISHED) {
      uiDataObj.iconName = 'chart-area';
      uiDataObj.actionText = TABLE_GAME_USER_ACTION.VIEW_DASHBOARD;
      uiDataObj.navigationLink = ROUTE_PATHS.DASHBOARD;
    }
    return (
      <div
        className="game-user-action clickable"
        data-game-status={`${gameStatus}`}
        onClick={() => navigate(uiDataObj.navigationLink)}>
        <span className="icon-wrapper me-2">
          <i class={`fa-solid fa-${uiDataObj.iconName}`}></i>
        </span>
        <span className="status-text">{uiDataObj.actionText}</span>
      </div>
    );
  }

  const getTableCellData = (keyName, gameData) => {
    if (keyName === 'game_scenario') {
      return getScenarioName(keyName, gameData);
    } else if (keyName === 'game_schedule') {
      return getGameSchedule(keyName, gameData);
    } else if (keyName === 'participants' || keyName === 'spectators') {
      return getGameUserProfiles(keyName, gameData);
    } else if (keyName === 'status') {
      return getGameStatus(gameData[keyName]);
    } else if (keyName === 'schedule_action') {
      return getScheduleAction(gameData['status']);
    } else if (keyName === 'user_action') {
      return getUserAction(gameData['status']);
    } else {
      return '';
    }
  }

  return (
    <section className="section-gamelist px-3">
      <div className="page-header-wrapper pb-3">
        <h1 className="title c-font-20">Your Games</h1>
        <div className="action-wrapper m-0">
          <button className="btn btn-primary btn-filled" onClick={() => navigate(ROUTE_PATHS.GAME_ADD_NEW)}>
            <span className="me-2">
              <i className="fa-solid fa-plus"></i>
            </span>
            Add New Game
          </button>
        </div>
      </div>

      <div className="page-content-wrapper">
        <div className="table-header-actions">
          <div className="search-box-wrapper">
            <div className="search-wrapper">
              <input type="search" name="user-commands" id="user-commands"
                onKeyUp={handleKeyEventsOnSearch}
                placeholder="Search Options" />
              <img src="/images/search_grey_icon.png" alt="Search Icon" />
            </div>
          </div>
          <div className="filter-box-wrapper">
          {
            availableFilters.map((filterData, filterIndex) => (
              <CustomFilter filterData={filterData} selectionChange={handleSelectionChange} key={`filterdata-${filterIndex}`} />
            ))
          }
          </div>
        </div>

        <div className="table-content-wrapper">
          <div className="table-responsive">
            <table className="table game-list-table">
              <thead>
                <tr>
                {
                  tableColumnHeaders.map((headerObj, headerIndex) => (
                    <th scope="col" key={`header-label-${headerIndex}`}>
                      { headerObj.headerLabel }
                      {
                        headerObj.headerKey === 'game_schedule'
                        ? (
                          <span
                            className="icon-wrapper sort-icon ps-2"
                            data-sort_mode={sortMode[headerObj.headerKey]}
                            onClick={() => handleTableSortClick(headerObj.headerKey)}>
                            <i className="fa-solid fa-arrow-up"></i>
                            <i className="fa-solid fa-arrow-down"></i>
                          </span>
                        )
                        : null
                      }
                    </th>
                  ))
                }
                </tr>
              </thead>
              <tbody>
              {
                gameListData.map((gameData, dataIndex) => (
                  <Fragment key={`table-data-row-${dataIndex}`}>
                    <tr className={`table-row align-middle`}>
                    {
                      tableColumnHeaders.map((headerObj, headerIndex) => (
                        <td key={`table-data-row-${dataIndex}-column-${headerIndex}`} className={`table-cell`}>
                        {
                          getTableCellData(headerObj.headerKey, gameData)
                        }
                        </td>
                      ))
                    }
                    </tr>
                    <tr className={`row-spacer`}>
                      <td className="table-cell" colSpan={tableColumnHeaders.length}></td>
                    </tr>
                  </Fragment>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameList;