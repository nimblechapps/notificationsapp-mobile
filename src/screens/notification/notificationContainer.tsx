import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import NotificationComponent from "./notificationComponent";
import { setNotificationList } from "../../redux/features/notification/notificationSlice";
import { NotificationList } from "../home/interface";
import api from "../../utils/axiosUtils";
import { URLS } from "../../redux/urls";

export default function NotificationContainer() {
  const { notificationList } = useAppSelector((state) => state.notification);

  const dispatch = useAppDispatch();
  const { deviceToken } = useAppSelector((state) => state.notification);
  const onPressNotification = async (item: NotificationList) => {
    try {
      await api
        .post(URLS.READ_NOTIFICATION, {
          id: item._id,
        })
        .then(async (response) => {
          await api
            .post(URLS.GET__ALL_NOTIFICATION, {
              deviceToken: deviceToken,
            })
            .then((response) => {
              dispatch(setNotificationList(response.data.notifications));
            });
        });
    } catch (error) {
      console.log("HomeScreenContainer ~ error:", error);
    }
  };

  const onPressReadAll = async () => {
    try {
      await api
        .post(URLS.READ_ALL_NOTIFICATION, { deviceToken: deviceToken })
        .then(async (response) => {
          await api
            .post(URLS.GET__ALL_NOTIFICATION, {
              deviceToken: deviceToken,
            })
            .then((response) => {
              dispatch(setNotificationList(response.data.notifications));
            });
        });
    } catch (error) {
      console.log("HomeScreenContainer ~ error:", error);
    }
  };

  return (
    <NotificationComponent
      notificationList={notificationList}
      onPressNotification={onPressNotification}
      onPressReadAll={onPressReadAll}
    />
  );
}
