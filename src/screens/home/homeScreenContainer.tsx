import { Alert, Platform } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import notifee, { AuthorizationStatus } from "@notifee/react-native";

import HomeScreenComponent from "./homeScreenComponent";
import { IHomeScreenProp } from "../../navigation/interface";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import api from "../../utils/axiosUtils";
import { URLS } from "../../redux/urls";
import { setNotificationList } from "../../redux/features/notification/notificationSlice";

export default function HomeScreenContainer({ navigation }: IHomeScreenProp) {
  const { deviceToken, notificationList } = useAppSelector(
    (state) => state.notification
  );
  const [notificationLoader, setNotificationLoader] = useState<number>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      requestUserPermission();
    })();
  }, []);

  async function requestUserPermission() {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      Alert.alert("User denied permissions for notifications");
    }
  }

  const onPressIcon = useCallback(() => {
    navigation.navigate("NotificationScreen");
  }, []);

  const handleButtonPress = async (buttonNumber: number) => {
    setNotificationLoader(buttonNumber);
    const title = `button ${buttonNumber}`;
    const body = `Button ${buttonNumber} clicked`;

    try {
      await api
        .post("/send-notification", {
          token: deviceToken,
          title: title,
          body: body,
          deviceType: Platform.OS,
        })
        .then(async () => {
          await api
            .post(URLS.GET__ALL_NOTIFICATION, {
              deviceToken: deviceToken,
            })
            .then((response) => {
              dispatch(setNotificationList(response.data.notifications));
            });
          setNotificationLoader(0);
        });
    } catch (error) {
      console.log("HomeScreenContainer ~ error:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await api
        .post(URLS.GET__ALL_NOTIFICATION, {
          deviceToken: deviceToken,
        })
        .then((response) => {
          dispatch(setNotificationList(response.data.notifications));
        });
    })();
  }, []);

  return (
    <HomeScreenComponent
      onPressIcon={onPressIcon}
      handleButtonPress={handleButtonPress}
      isAllNotificationRead={notificationList.every(
        (notification) => notification.isRead
      )}
      loadingButton={notificationLoader}
    />
  );
}
