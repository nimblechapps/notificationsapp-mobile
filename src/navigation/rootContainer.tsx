import notifee, { EventType } from "@notifee/react-native";
import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import Routes from "../utils/routes";
import HomeScreenContainer from "../screens/home/homeScreenContainer";
import NotificationContainer from "../screens/notification/notificationContainer";
import SplashScreenContainer from "../screens/splash/splashScreenContainer";
import { displayNotification } from "../utils/notification";
import {
  setDeviceToken,
  setNotificationList,
} from "../redux/features/notification/notificationSlice";
import moment from "moment";
import { navigationRef } from "../utils/navigation";

export default function RootContainer() {
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();

  const { notificationList } = useAppSelector((state) => state.notification);

  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [splashShow, setSplashShow] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashShow(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.DELIVERED) {
        const _notificationList = {
          id: Math.random().toString(),
          title: detail.notification?.title,
          body: detail.notification?.body,
          isRead: false,
          date: moment(),
        };
        dispatch(setNotificationList([_notificationList]));
      } else if (type === EventType.DISMISSED) {
        dispatch(
          setNotificationList(
            notificationList.map((item) => ({
              ...item,
              isRead: false,
            }))
          )
        );
      } else if (type === EventType.PRESS) {
        navigationRef.current?.navigate(Routes.Notification);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        displayNotification(remoteMessage);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      const deviceToken = await AsyncStorage.getItem("deviceToken");
      if (!deviceToken) {
        const token = await messaging().getToken();
        if (token) {
          dispatch(setDeviceToken(token));
          await AsyncStorage.setItem("deviceToken", token);
        }
      }
    })();
  }, []);

  if (splashShow) {
    return <SplashScreenContainer />;
  }

  return (
    <NavigationContainer
      onReady={() => setIsNavigationReady(true)}
      ref={navigationRef}
    >
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.Home}
          component={HomeScreenContainer}
          options={{ headerBackVisible: false, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name={Routes.Notification}
          component={NotificationContainer}
          options={{ headerBackVisible: true, headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
