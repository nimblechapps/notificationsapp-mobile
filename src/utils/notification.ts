import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  NativeAndroidChannel,
} from "@notifee/react-native";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export const getChannelId = async () => {
  const existedChannel: NativeAndroidChannel | null = await notifee.getChannel(
    "NotificationApp"
  );

  // Create a channel (required for Android)
  if (!existedChannel) {
    const channelId: string = await notifee.createChannel({
      id: "NotificationApp",
      name: "NotificationApp",
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });
    return channelId;
  }

  return existedChannel.id;
};

export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  const channelId: string = await getChannelId();
  if (remoteMessage) {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId: channelId,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        style: {
          type: AndroidStyle.BIGTEXT,
          text: remoteMessage.notification?.body ?? "",
        },
        pressAction: {
          id: "default",
        },
      },
    });
  }
};
