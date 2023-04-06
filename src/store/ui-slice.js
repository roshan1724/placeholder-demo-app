import { createSlice } from "@reduxjs/toolkit";
// import { API_PATHS } from "../utilities/constants";
import { TIMEZONE_LIST } from "../utilities/timeZone";

const UiSlice = createSlice({
  name: "UI",
  initialState: {
    showLoader: false,
    showModal: false,
    header: {
      showHeader: false,
      notification: {
        notificationList: [],
        count: 0,
        changed: false,
        showNotification: false,
      },
      gameView: {
        showGameView: false,
        isActive: false,
      },
    },
    timeZones: {
      zoneList: [],
      currentZone: "",
    },
  },
  reducers: {
    // Loader Actions
    setShowLoader: (state, action) => {
      const loadingState = action.payload;
      state.showLoader = loadingState;
    },

    // Modal Actions
    setShowModal: (state, action) => {
      const showModalState = action.payload;
      state.showModal = showModalState;
    },

    // Header Actions
    setShowHeader: (state) => {
      state.header.showHeader = !state.header.showHeader;
    },

    // Notification Actions
    setShowNotification: (state) => {
      state.header.notification.showNotification =
        !state.header.notification.showNotification;
    },

    addNotifications: (state, action) => {
      state.header.notification.changed = true;
      const newNotification = action.payload;
      state.header.notification.notificationList.push(newNotification);
      state.header.notification.count += 1;
    },

    removeNotification: (state, action) => {
      state.header.notification.changed = true;
      const id = action.payload;
      // TODO: update condition find the relevant notifation to be removed
      const existingItem = state.header.notification.notificationList.find(
        (item) => !id
      );
      if (existingItem) {
        state.header.notification.notificationList =
          state.header.notification.notificationList.filter((item) => item);
        state.header.notification.count -= 1;
      } else {
        console.error(`Notification cannot be found to be removed!`);
      }
    },

    updateNotification: (state, action) => {},

    // GameView Actions
    setShowGameView: (state) => {
      state.header.gameView.showGameView = !state.header.gameView.showGameView;
    },

    setGameViewActive: (state, action) => {
      state.header.gameView.isActive = !!action.payload;
    },

    // TimeZone Actions
    populateTimeZones: (state) => {
      const _timeZoneData = [
        ...new Set(TIMEZONE_LIST.map((data) => data.abbr)),
      ].sort();
      const _currentZoneData = TIMEZONE_LIST.find((ele) => {
        const zone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;
        return ele.utc.includes(zone);
      });

      console.log(`timeZoneData ==> `, _timeZoneData);
      console.log(`currentTimeZone ==> `, _currentZoneData.abbr);
      state.timeZones.zoneList = _timeZoneData;
      state.timeZones.currentZone = _currentZoneData.abbr || "UTC";
    },
  },
});

export const UiActions = UiSlice.actions;

export default UiSlice;
