import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationSlice } from "./interface";
import { URLS } from "../../urls";

const initialState: NotificationSlice = {
  notificationList: [],
  isAllNotificationRead: true,
  deviceToken: "",
  accessToken: URLS.ACCESS_TOKEN,
  refreshToken: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationList: (state, action) => {
      state.notificationList = action.payload;
    },
    updateNotificationList: (state, action) => {
      state.notificationList = action.payload;
      state.isAllNotificationRead = state.notificationList.every(
        (notification) => notification.isRead
      );
    },
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {
  setNotificationList,
  updateNotificationList,
  setDeviceToken,
  setAccessToken,
  setRefreshToken,
} = notificationSlice.actions;

export default notificationSlice.reducer;
