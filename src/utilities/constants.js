export const PRINT_PREVIEW_CONTAINER = "app-print-preview";
export const MODALVIEW_CONTAINER = "app-modal";

export const ROUTE_PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REPORT: "/report",

  
  // Company Paths
  COMPANY_ROOT: "/company",
  COMPANY_HOME: "/company/home",
  COMPANY_DETAILS: "/company/details",
  COMPANY_EMAIL_SETUP: "/company/email-setup",
  
  // Game Paths
  GAME_ROOT: "/game",
  GAME_ADD_NEW: "/game/add-game",
  GAME_PLAYBOARD: "/game/playboard",
  
  // PRINT Paths
  PRINT_REPORT: "/print/report",
}

export const API_PATHS = {
  DASHBOARD_DATA: '/data/dashboard-summary-data.json',
  GAME_LIST_DATA: '/data/game-list.json',
  INCIDENT_DATA: '/data/incident-data.json',
  INCIDENT_OPTION_DATA: '/data/incident-option-data.json',
  USER_LIST_DATA: '/data/user-data.json',
}

export const TABLE_GAME_STATUS = {
  ONGING: "Ongoing",
  FINISHED: "Finished",
  SCHEDULED: "Scheduled"
}

export const TABLE_GAME_SCHEDULE_ACTION = {
  RESTART: "Restart",
  DUPLICATE: "Duplicate",
  EDIT: "Edit/Reschedule"
}

export const TABLE_GAME_USER_ACTION = {
  VIEW_GAME: "View Game",
  VIEW_DASHBOARD: "View Dashboard"
}
