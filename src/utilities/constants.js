export const GAME_MODES = {
  VIEW_ONLY: "view_only",
  GAME_PLAY: "game_play",
};

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
  GAME_ROOT: "/games",
  GAME_ADD_NEW: "/game/add-game",
  GAME_PLAYBOARD: "/game/playboard",
  GAME_PLAYBOARD_VIEW_ONLY: `/game/playboard?${GAME_MODES.VIEW_ONLY}=1`,

  // Admin Games
  ADMIN: "/admin",
  ADMIN_GAME: "/admin/games",
  ADMIN_CONFIG_GAME: "/admin/config-game",
  ADMIN_CONFIG_GAME_NAME: "/admin/config-game/:gameId",

  // PRINT Paths
  PRINT: "/print",
  PRINT_PAGE: "/print/:pageName",
};

export const API_PATHS = {
  COMPANY_DETAIL_FORM: "/data/company-detail-form.json",
  DASHBOARD_DATA: "/data/dashboard-summary-data.json",
  GAME_SCENARIO_LIST: "/data/game-scenario-list.json",
  GAME_SCENARIO_FORM: "/data/game-scenario-detail-form.json",
  GAME_LIST_DATA: "/data/game-list.json",
  INCIDENT_DATA: "/data/incident-data.json",
  INCIDENT_OPTION_DATA: "/data/incident-option-data.json",
  USER_LIST_DATA: "/data/user-data.json",
};

export const PRINT_PREVIEW_CONTAINER = "app-print-preview";

export const PRINT_PAGE_NAMES = {
  REPORT: "report",
};

export const PRINTABLE_REPORT_TYPE = {
  GENERATED_REPORT: "generated_report",
  MODIFIED_REPORT: "modified_report",
};

export const MODALVIEW_CONTAINER = "app-modal";

export const APP_MODAL_TYPES = {
  SUCCESS: "success",
  INFO: "info",
  ERROR: "error",
};

export const USER_ROLES = {
  ADMIN: "admin",
  PLAYER: "player",
  SPECTATOR: "spectator",
};

export const TABLE_GAME_STATUS = {
  ONGING: "Ongoing",
  FINISHED: "Finished",
  SCHEDULED: "Scheduled",
};

export const TABLE_GAME_SCHEDULE_ACTION = {
  RESTART: "Restart",
  DUPLICATE: "Duplicate",
  EDIT: "Edit/Reschedule",
};

export const TABLE_GAME_USER_ACTION = {
  VIEW_GAME: "View Game",
  VIEW_DASHBOARD: "View Dashboard",
};

export const TABLE_USER_PROFILE_LIMIT = 3;

export const MAX_INPUT_LIMIT = 4096;

export const FORM_CONSTANTS = {
  VALIDATIONS: ["REQUIRED", "EMAIL"],
};
