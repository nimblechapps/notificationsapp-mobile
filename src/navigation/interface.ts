import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeStack = {
  HomeScreen: undefined;
  NotificationScreen: undefined;
};

type IHomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStack,
  "HomeScreen"
>;
type INotificationScreenNavigationProp = NativeStackNavigationProp<
  HomeStack,
  "NotificationScreen"
>;

export type IHomeScreenProp = {
  navigation: IHomeScreenNavigationProp;
};
export type INotificationScreenProp = {
  navigation: INotificationScreenNavigationProp;
};

export interface RemoteMessage {
  notification?: {
    title: string | undefined;
    body: string | undefined;
  };
}

export interface NotificationDetail {
  notification?: {
    title: string;
    body: string;
  };
}
