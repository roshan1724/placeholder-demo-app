import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const UiActions = UiSlice.actions;

export default UiSlice;
